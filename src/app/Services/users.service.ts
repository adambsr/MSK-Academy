import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'app/Config/Config';
import { Users } from 'app/Models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public Config: Config = new Config;
  APIUrl : string = this.Config.getAPIPath();

  constructor(private http: HttpClient ){}

  getCountUsers(): any{
    return this.http.get(this.APIUrl+'Users/CountUsers');
  }

  getUsersPagination( Rech : string,  pageNumber : any): any {
    //console.log("SERV  "+this.APIUrl+'Languages?Rech='+Rech+'&pageNumber='+pageNumber)
    return this.http.get<any>(this.APIUrl+'Users/GetPaginations?Rech='+Rech+'&pageNumber='+pageNumber);
  }

  getActiveUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'Users/Active'); //Charger tous les countries actifs seulement
  }

  getCities(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'Cities');
  }

  getEditUsers(id: number): any {
    console.log(this.APIUrl + 'Users/' + id);
    return this.http.get(this.APIUrl + 'Users/GetEdit/' + id);
  }

  getClasses(): Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'Class');
  }

  getUsers(): Observable<Users[]>{
    return this.http.get<Users[]>(this.APIUrl+'Users');
  }

  getTutors(): Observable<Users[]>{
    return this.http.get<Users[]>(this.APIUrl+'Users/Tutors');
  }

  addUser(val: any): any{
    return this.http.post(this.APIUrl+'Users',val);
  }
 
  deleteUser(val: any): any{
    return this.http.delete(this.APIUrl+'Users/'+val);
  }

  getUserId(val: any): any{
    console.log(this.APIUrl+'Users/'+val);
    return this.http.get(this.APIUrl+'Users/'+val);
  }

  updateUser(val: any): any{
    return this.http.put(this.APIUrl+'Users/',val);
  }

  updateActiveUser(id: number, active : number): any {
    return this.http.put(this.APIUrl + 'Users/EnableDisable?id='+id+'&Active='+active,id);
  }

  uploadPhoto(val: any): any{
    return this.http.post(this.APIUrl+'users/images',val);
  }

  
}
