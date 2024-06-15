import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'app/Config/Config';
import { Lessons } from 'app/Models/lessons';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  public Config: Config = new Config;
  APIUrl : string = this.Config.getAPIPath();
  constructor(private http: HttpClient,public router: Router) { }


  getLessonByCourse(IdCourse: number): Observable<Lessons[]> {
    return this.http.get<Lessons[]>(this.APIUrl+'Lessons/GetLessonsByCourse/'+IdCourse);
  } 

   

  getLessons(): Observable<Lessons[]>{
    return this.http.get<[Lessons]>(this.APIUrl+'Lessons');
  }

  addLesson(val: any): any{
    return this.http.post(this.APIUrl+'Lessons',val);
  }

  update(val: any): any{
    return this.http.put(this.APIUrl+'Lessons',val);
  }
  
  GetEnrolledLessonByCourse(idCourse: number,idCandidate: number): any{
    return this.http.get(this.APIUrl+'Lessons/GetEnrolledLessonByCourse?IdCourse='+idCourse+'&IdCandidate='+idCandidate);
  }
  
  UpdateLessonProgress(idCourse: number,idCandidate: number,OrderLesson: number): any{
    return this.http.put(this.APIUrl+'Lessons/UpdateLessonProgress?IdCourse='+idCourse+'&IdCandidate='+idCandidate+'&OrderLesson='+OrderLesson,idCourse);
  }

  delete(val: any): any{
    return this.http.delete(this.APIUrl+'Lessons/'+val);
  }
  getById(id: any): any{
    return this.http.get(this.APIUrl+'Lessons/'+id);
  }
  uploadPhoto(val: any): any{
    return this.http.post(this.APIUrl+'Lessons/Images',val);
  }

  getFilesLesson(val: any): any{
    return this.http.get(this.APIUrl+'Files/Lesson/'+val);
  }

  getVideosLesson(val: any): any{
    return this.http.get(this.APIUrl+'Videos/'+val);
  }

 
  uploadVideo(val: any): any{
    return this.http.post(this.APIUrl+'Lessons/videos',val, {
      reportProgress: true,
      observe: 'events',
    });
  }

  deleteVideo(videoname: any): any{
     let l : any = this.http.delete(this.APIUrl+'Lessons/videos?videoname='+videoname);
     let x : any = this.http.delete(this.APIUrl+'videos/name/'+videoname);
     //console.log(l,x);
     return x;
  }

  addVideo(val: any): any{
    return this.http.post(this.APIUrl+'Videos',val);
  }

  uploadFiles(val: any): any{
    return this.http.post(this.APIUrl+'Lessons/Files',val, {
      reportProgress: true,
      observe: 'events',
    });
  }

  addFile(val: any): any{
    return this.http.post(this.APIUrl+'Files',val);
  }

  deleteFile(fileName: any): any{
    //console.log(fileName);
    let x = this.http.delete(this.APIUrl+'Lessons/Files?fileName='+fileName);
    let y : any = this.http.delete(this.APIUrl+'Files/fileName?fileName='+fileName);
    return y;
  }
}