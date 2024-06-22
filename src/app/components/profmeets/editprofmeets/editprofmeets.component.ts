import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Config } from 'app/Config/Config';
import { MeetsService } from 'app/Services/meets.service';
import { CoursesService } from 'app/Services/courses.service';

@Component({
  selector: 'app-editprofmeets',
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
  templateUrl: './editprofmeets.component.html',
  styleUrl: './editprofmeets.component.scss'
})
export class EditprofmeetsComponent {
  public Config: Config = new Config;
  APIUrl: string = this.Config.getAPIPath();

  meetForm: UntypedFormGroup;
  id: number;
  Courses: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private meetsService: MeetsService,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
  ) {this.route.params.subscribe((params: Params) => {
    this.id = Number(params['id']);}
  );}

  ngOnInit() {
    this.meetForm = this.formBuilder.group({
      IdCourse: [null],
      TitleMeet: ['', Validators.required],
      LinkMeet: ['', Validators.required],
      DateMeet: ['', Validators.required],
      DescriptionMeet: ['', Validators.required],
    });

    this.coursesService.getcourses().subscribe(
      (res: any) => {
        this.Courses = res;
        //this.Role=res;
        console.log(res);
      },
      (error: any) => {
        console.log(error);
        if (error.status == 400 || error.status == 0) {
          // Bad Request
          alert("Error Connexion Server");
        }
      }
    );

    this.meetsService.getMeetById(this.id).subscribe(
      (res: any) => {
        console.log(res);
        this.meetForm = this.formBuilder.group({
          IdCourse: [res[0].IdCourse, Validators.required],
          TitleMeet: [res[0].TitleMeet, Validators.required],
          LinkMeet: [res[0].LinkMeet, Validators.required],
          DateMeet: [res[0].DateMeetCourse, Validators.required],
          DescriptionMeet: [res[0].DescriptionMeet, Validators.required]
        });
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

  escapeSpecialCharacters(input: string): string {
    // Map of special characters and their escaped equivalents
    const escapeMap: { [key: string]: string } = {
      '\n': '\\n',
      '\t': '\\t',
      '\\': '\\\\',
      '\'': '\\\'',
      '\"': '\\\"'
      // Add more special characters and their escaped equivalents as needed
    };

    // Replace each special character with its escaped equivalent
    return input.replace(/[\n\t\\'"]/g, match => escapeMap[match]);
  }

  submit() {
    const IdCourse = Number(this.meetForm.value['IdCourse']);
    const TitleMeet = this.escapeSpecialCharacters(this.meetForm.value['TitleMeet']);
    const LinkMeet = this.escapeSpecialCharacters(this.meetForm.value['LinkMeet']);
    const DateMeet = this.meetForm.value['DateMeet'];
    const DescriptionMeet = this.escapeSpecialCharacters(this.meetForm.value['DescriptionMeet']);
    const Active = 1;

    const val = { IdCourse, TitleMeet, LinkMeet, DateMeet, DescriptionMeet, Active};
    console.log(val);

    this.meetsService.updateMeet(val).subscribe((result: any) => {
      console.log(result);
      if (result.StatusCode == 302) {
        // duplicated
        alert("Error duplicated");
      } else if (result.StatusCode == 200 || result.StatusCode == 1000) {
        this.router.navigateByUrl('dashboard/profmeets/view/1');
      } else if (result.StatusCode == 0) {
        alert("Video not Able to Upload");
      } else {
        //alert(result);
      }
    }), (errors: any) => {
      console.log(errors);
      if (errors.status == 400 || errors.status == 0 || errors.status == 404 || errors.status == 403) {
        // Bad Request Unauthorized 
        alert("Error Connexion Server or Session");
      }
    };
  }
}
