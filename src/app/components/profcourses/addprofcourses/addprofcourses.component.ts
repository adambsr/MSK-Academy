import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { FormControl, FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CoursesService } from 'app/Services/courses.service';
import { CategoriesService } from 'app/Services/categories.service';
import { Config } from 'app/Config/Config';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addprofcourses',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    TranslocoModule,
    FormsModule,
    MatFormFieldModule,
    NgClass,
    MatInputModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatChipsModule,
    MatDatepickerModule,
  ],
  templateUrl: './addprofcourses.component.html',
  styleUrl: './addprofcourses.component.scss'
})
export class AddprofcoursesComponent {

  public Config: Config = new Config();
  APIUrl: string = this.Config.getAPIPath();
  photoName: string = 'emptyimg.jpg';
  photoUrl: string = this.Config.getPhotoPath('courses');
  photo: string = this.photoUrl + this.photoName;

  courseForm: UntypedFormGroup;
  Categories: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private CoursesService: CoursesService,
    private CategoriesService: CategoriesService,
    private Router: Router
  ) {
  }

  ngOnInit() {
    this.CategoriesService.getCategories().subscribe(
      (res: any) => {
        this.Categories = res;
        console.log(res);
      },
    );
    (error: any) => {
      console.log(error);
      if (error.status == 400 || error.status == 0) {
        // Bad Request
        alert('Error Connexion Server');
      }
    };

    this.courseForm = this.formBuilder.group({
      TitleCourse: ['', Validators.required],
      Subtitle: ['', Validators.required],
      Description: ['', Validators.required],
      DurationHour: ['', Validators.required],
      IdCateg: ['', Validators.required],
      Active: [1, Validators.required],
      PictureCourse: [''],
    });
  }

  uploadPhoto(event: any): void {
    const file = event.target.files[0];
    const formaData: FormData = new FormData();
    formaData.append('uploadedFile', file, file.name);
    this.CoursesService.uploadPhoto(formaData).subscribe((data: any) => {
      console.log(data);
      this.photoName = data.toString();
      this.photo = this.photoUrl + this.photoName;
    });
  }

  submit() {
    const TitleCourse = this.courseForm.value['TitleCourse'];
    //alert(TitleCourse);
    const Subtitle = this.courseForm.value['Subtitle'];
    //alert(Subtitle);
    const DescriptionCourse = this.courseForm.value['Description'];
    //alert(DescriptionCourse);
    const DurationHour = this.courseForm.value['DurationHour'];
    //alert(DurationHour);
    const IdCategory = this.courseForm.value['IdCateg'];
    //alert(IdCateg);
    const PictureCourse = this.photoName;
    //alert(PictureCourse);

    const IdTutor: number = Number(localStorage.getItem("UserId"));

    const Active = 1;
    
    const val = {
      TitleCourse,
      Subtitle,
      DescriptionCourse,
      PictureCourse,
      DurationHour,
      IdCategory,
      IdTutor,
      Active,
    };
    console.log(val);

    this.CoursesService.add(val).subscribe((result: any) => {
      console.log(result);
      if (result.StatusCode == 302) {
        // duplicated
        alert('Error Email already exists');
      } else if (result.StatusCode == 305) {
        alert('Error Telephone number already exists');
      } else if (result.StatusCode == 202) {
        this.Router.navigateByUrl('dashboard/profcourses/view/1');
      } else {
        alert(result.StatusCode);
      }
    }),
      (errors: any) => {
        //console.log(errors);
        if (
          errors.status == 400 ||
          errors.status == 0 ||
          errors.status == 404 ||
          errors.status == 403
        ) {
          // Bad Request Unauthorized
          alert('Error Connexion Server or Session');
        }
      };

  }
}
