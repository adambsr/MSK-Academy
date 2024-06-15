import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'app/Config/Config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  public Config: Config = new Config();
  APIUrl: string = this.Config.getAPIPath();
  constructor(private http: HttpClient, public router: Router) {}
  getStates(): Observable<any[]> {
      return this.http.get<any[]>(this.APIUrl + 'States'); //Charger tous les states, 
  }

  getActiveStates(): Observable<any[]> {
    return this.http.get<any[]>(this.APIUrl + 'States/Active'); //Charger tous les states actifs seulement
}
}
