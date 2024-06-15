import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Config } from 'app/Config/Config';
import { CoursesService } from 'app/Services/courses.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersService } from 'app/Services/users.service';

@Component({
  selector: 'app-printcertificate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './printcertificate.component.html',
  styleUrl: './printcertificate.component.scss'
})
export class PrintcertificateComponent {

  public Config: Config = new Config();

  idUser : number = Number(localStorage.getItem("UserId"));
  CandidateName : string = localStorage.getItem("FirstName") + localStorage.getItem("LastName");
  FirstName   : string ="";
  today : Date = new Date();

  idCourse : number;
  myCourse : any;

  idTutor : number;
  myTutor : any;

    constructor(
    private coursesService : CoursesService,
    private usersService   : UsersService,
    private router: Router, 
    private route: ActivatedRoute
    )
    {
        this.route.params.subscribe((params: Params) => {
            this.idCourse = params['idCourse'];
            this.idTutor  = params['idTutor'];
          }
            );
    }

    ngOnInit(): void
    {
      this.coursesService.getCourseById(this.idCourse).subscribe(
        (resCourse: any) => {
            this.myCourse = resCourse[0];
            console.log(resCourse);
        },
        (error) => {
            console.log("Error getCourseById " + this.idCourse);
            console.error(error);
        }
      );

      this.usersService.getUserId(this.idTutor).subscribe(
        (resTutor: any) => {
            this.myTutor = resTutor[0];
            //console.log(resCourse);
        },
        (error) => {
            console.log("Error getCourseById " + this.idCourse);
            console.error(error);
        }
      );

       



    }
  
}
