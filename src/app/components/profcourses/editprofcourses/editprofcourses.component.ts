import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule, UntypedFormGroup, UntypedFormBuilder, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslocoModule, TranslocoService } from '@ngneat/transloco';
import { Config } from 'app/Config/Config';
import { CoursesService } from 'app/Services/courses.service';
import { CategoriesService } from 'app/Services/categories.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-editprofcourses',
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
  templateUrl: './editprofcourses.component.html',
  styleUrl: './editprofcourses.component.scss'
})
export class EditprofcoursesComponent implements OnInit {
  public Config: Config = new Config();
  APIUrl: string = this.Config.getAPIPath();

  photoName: string = 'anonymous.jpg';
  photoUrl: string = this.Config.getPhotoPath('courses');
  photo: string = this.photoUrl;

  id: number;
  Categories: any;
  courseForm: UntypedFormGroup;

  constructor(
    private translocoService: TranslocoService,
    private formBuilder: UntypedFormBuilder,
    private CoursesService: CoursesService,
    private CategoriesService: CategoriesService,
    private route: ActivatedRoute,
    private Router: Router
  ) {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
    }
    );
  }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      TitleCourse: ['', Validators.required],
      Subtitle: ['', Validators.required],
      Description: ['', Validators.required],
      DurationHour: ['', Validators.required],
      IdCateg: ['', Validators.required],
      Active: [1, Validators.required],
      PictureCourse: [''],
    });

    this.CategoriesService.getCategories().subscribe(
      (res: any) => {
        this.Categories = res;
        console.log(res);
      },
      (error: any) => {
        console.log(error);
        if (error.status == 400 || error.status == 0) {
          // Bad Request
          alert('Error Connexion Server');
        }
      }
    );

    this.CoursesService.getCourseById(this.id).subscribe(
      (res: any) => {
        console.log(res);
        this.courseForm = this.formBuilder.group({
          TitleCourse: [res[0].TitleCourse, Validators.required],
          Subtitle: [res[0].Subtitle, Validators.required],
          Description: [res[0].DescriptionCourse, Validators.required],
          DurationHour: [res[0].DurationHour, Validators.required],
          IdCateg: [res[0].IdCategory, Validators.required],
          PictureCourse: [res[0].PictureCourse],
          Active: [res[0].Active, Validators.required],
        });
        this.photo = this.photoUrl + res[0].PictureCourse;
        this.photoName = res[0].PictureCourse;
      },
      (error: any) => {
        console.log(error);
        if (error.status == 400 || error.status == 0) {
          // Bad Request
          alert('Error Connexion Server');
        }
      }
    );
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

    this.CoursesService.update(val).subscribe((result: any) => {
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

