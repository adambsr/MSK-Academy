import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
 
import { TranslocoModule,  TranslocoService } from "@ngneat/transloco";
import { Config } from "app/Config/Config";
import { UsersService } from "app/Services/users.service";
import { CoursesService } from "app/Services/courses.service";
import { LessonsService } from "app/Services/lessons.service";
import { CountriesService } from "app/Services/countries.service";
import { StatesService } from "app/Services/states.service";
import { ActivatedRoute, Params, Router, RouterLink } from "@angular/router";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { FuseCardComponent } from '@fuse/components/card';
import { MatButtonModule } from '@angular/material/button';
import { Coursedetails } from 'app/Models/coursedetails';
import { Enrollments } from 'app/Models/enrollments';

@Component({
  selector: 'app-coursedetails',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    MatExpansionModule,
    NgFor,
    TranslocoModule,
    FuseCardComponent,
    MatButtonModule,


  ],
  templateUrl: './coursedetails.component.html',
  styleUrl: './coursedetails.component.scss'
})
export class CoursedetailsComponent {
 
  public Config: Config = new Config();
  idCourse: number;
  courseDetails: Coursedetails | null = null; 

  IsConnected: boolean = false;
  IsEnrolled : boolean = false;
  IsConnectedEnrolled : boolean = false;

  course : any;
  tutor : any;
  lessons : any;
  
  APIUrl: string = this.Config.getAPIPath();

  photoName: string = "anonymous.jpg";

  photoUrl: string = this.Config.getPhotoPath("users");

  photoCourseUrl: string = this.Config.getPhotoPath("courses");

  idUser : number = Number(localStorage.getItem("UserId"));

  photo: string = this.photoUrl + this.photoName;

  constructor(
    private UsersService: UsersService,
    private translocoService: TranslocoService,
    //private formBuilder: UntypedFormBuilder,
    private CountriesService: CountriesService,
    private coursesService : CoursesService,
    private LessonsService: LessonsService,
    private StatesService: StatesService,
    private router: Router, 
    private route: ActivatedRoute
  ) {
    // this.currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss');
      this.route.params.subscribe((params: Params) => {
          this.idCourse = params['id'];}
		  );

      
  }

  ngOnInit(){
    this.IsConnected = (localStorage.getItem("accessToken") != null )? true : false;
    //this.IsConnected = true;
    this.fetchCourseDetails();

    this.coursesService.CheckEnrollment(this.idCourse ,this.idUser).subscribe(
      (resEnroolCourse: any) => {
        console.log(resEnroolCourse);
          this.IsEnrolled = (resEnroolCourse.StatusCode == 302 ) ? true : false;

        console.log(this.IsEnrolled);
           
      },
      (error) => {
          console.log("Error CheckEnrollment " + this.idCourse );
          console.error(error);
      }
    );

  }

  // checkIsConnectedEnrolled(){
  //    if(this.IsConnected == false )
  //     {
  //       return false;

  //     }else if(this.IsConnected == true &&  ){

  //     }
  // }

  EnrollCourse(idCourse : number){
    alert(this.lessons.length);
    //const datetime_stream0 =new Date(form.value['myDate']);

    if(this.IsEnrolled){
      alert("You are already enrolled, Welcome back");
      this.router.navigateByUrl("dashboard/academy/"+idCourse);
      return;
    }

    const IdEnrollment     : number = 0;
    const IdCandidate      : number = this.idUser;
    const IdCourse         : number = this.idCourse;
    const EnrollmentDate   : Date =new Date();
    const ProgressCurrentLesson   : number = 0;
    const TotalLessonInCourse     : number = Number(this.lessons.length);
     
    const Enrollement : Enrollments = {IdEnrollment,IdCandidate,IdCourse,EnrollmentDate,ProgressCurrentLesson,TotalLessonInCourse};
    
    this.coursesService.AddEnrollment(Enrollement).subscribe(
      (resEnroolCourse: any) => {
        console.log(resEnroolCourse);
          
        if(resEnroolCourse.StatusCode == 302){
          alert("You are already enrolled ");

        }else if(resEnroolCourse.StatusCode == 202){

          alert("You are enrolled Now you can access to course");
          this.router.navigateByUrl("dashboard/academy/"+idCourse);

        }else{
          alert("Failed to enroll, please try again later.");
        }
        
           
      },
      (error) => {
          console.log("Error CheckEnrollment " + this.idCourse );
          console.error(error);
      }
    );
    
  }

  fetchCourseDetails() {
    this.coursesService.getCourseById(this.idCourse).subscribe(
        (resCourse: any) => {
            this.course = resCourse[0];
            console.log(resCourse);

            this.coursesService.getTutorByCourse(this.idCourse).subscribe(
              (resTutor: any) => {
                  this.tutor = resTutor[0];
                  console.log(resTutor);
               
                  this.LessonsService.getLessonByCourse(this.idCourse).subscribe(
                    (resLesson: any) => {
                        this.lessons = resLesson;
                        console.log(resLesson); 
                    },
                    (error) => {
                        console.log("Error getLessonByCourse " + this.idCourse);
                        console.error(error);
                    }
                  );
                  
              },
              (error) => {
                  console.log("Error getTutorByCourse " + this.idCourse);
                  console.error(error);
              }
          );

        },
        (error) => {
            console.log("Error getCourseById " + this.idCourse);
            console.error(error);
        }
    );
}

// Fetch tutor image
getTutorPicture(PictureTutor: string): string {
    return `${this.Config.getPhotoPath('users')}${PictureTutor}`;
}

// Fetch course image
getCoursePicture(PictureCourse: string): string {
    return `${this.Config.getPhotoPath('courses')}${PictureCourse}`;
}

// Fetch lesson image
getLessonPicture(PictureLesson: string): string {
    return `${this.Config.getPhotoPath('lessons')}${PictureLesson}`;
}

}
