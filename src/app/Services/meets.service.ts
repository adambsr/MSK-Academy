import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'app/Config/Config';
import { Meets } from 'app/Models/Meets';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetsService {

  public Config: Config = new Config;
  APIUrl : string = this.Config.getAPIPath();
  constructor(private http: HttpClient,public router: Router) { }


  updateActiveMeets(id: number, active : number): any {
    return this.http.put(this.APIUrl + 'Meets/EnableDisable?id='+id+'&Active='+active,id);
  }

  getMeets(): Observable<Meets[]>{
    return this.http.get<Meets[]>(this.APIUrl+'Meets');
  }

  addMeet(val: any): any{
    return this.http.post(this.APIUrl+'Meets',val);
  }

  updateMeet(val: any): any{
    return this.http.put(this.APIUrl+'Meets',val);
  }

  deleteMeet(val: any): any{
    return this.http.delete(this.APIUrl+'Meets/'+val);
  }

  getMeetById(id: any): any{
    return this.http.get(this.APIUrl+'Meets/'+id);
  }

  getMeetsByCourse(idCourse: any): any{
    return this.http.get(this.APIUrl+'Meets/GetMeetsByCourse?IdCourse='+idCourse);
  }

  uploadPhoto(val: any): any{
    return this.http.post(this.APIUrl+'meets/images',val);
  }

}