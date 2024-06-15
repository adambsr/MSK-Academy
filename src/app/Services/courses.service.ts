import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Courses } from 'app/Models/courses';
import { Config } from 'app/Config/Config';
import { Observable } from 'rxjs';
import { Enrollments } from 'app/Models/enrollments';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  getcourse(id: number) {
    throw new Error('Method not implemented.');
  }

  public Config: Config = new Config;
  APIUrl : string = this.Config.getAPIPath();
  constructor(private http: HttpClient,public router: Router) { }


  getcourses(): Observable<Courses[]>{
    return this.http.get<Courses[]>(this.APIUrl+'Courses');
  }

  getCourseByTutor(idTutor: any): Observable<Courses[]> {
    return this.http.get<Courses[]>(this.APIUrl+'Courses/GetCoursesByTutor?IdTutor='+idTutor);
  }

  getEnrolledCourseByCandidate(idCandidate: number): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl+'Courses/GetEnrolledCourseByCandidate/'+idCandidate);
  }

  getTutorByCourse(idCourse: number): Observable<any> {
    return this.http.get<any>(this.APIUrl+'Courses/GetTutorByCourse/'+idCourse);
  }

  GetCourseDetails(id: any): any {
    return this.http.get(this.APIUrl + 'Courses/GetCourseDetails/' + id);
  }

  CheckEnrollment(idCourse: number , idCandidate: number): any {
    return this.http.get(this.APIUrl + 'Courses/CheckEnrollment?IdCourse='+idCourse+'&IdCandidate='+idCandidate);
  }
  
  AddEnrollment(enrollment : Enrollments): any{
    return this.http.post(this.APIUrl+'Courses/AddEnrollment',enrollment);
  }
  
  add(val: any): any{
    return this.http.post(this.APIUrl+'Courses',val);
  }

  update(val: any): any{
    return this.http.put(this.APIUrl+'Courses',val);
  }

  updateActiveCourse(id: number, active : number): any {
    return this.http.put(this.APIUrl + 'Courses/EnableDisable?id='+id+'&Active='+active,id);
  } 

  delete(val: any): any{
    return this.http.delete(this.APIUrl+'Courses/'+val);
  }
  getCourseById(id: any): any{
    return this.http.get(this.APIUrl+'Courses/'+id);
  }
  uploadPhoto(val: any): any{
    return this.http.post(this.APIUrl+'courses/images',val);
  }
}
