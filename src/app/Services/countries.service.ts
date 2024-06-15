import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'app/Config/Config';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CountriesService {
    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();
    constructor(private http: HttpClient, public router: Router) {}
    getCountries(): Observable<any[]> {
        return this.http.get<any[]>(this.APIUrl + 'Countries'); //Charger tous les countries, fihom li manest3rfoush bihom
    }

    getActiveCountries(): Observable<any[]> {
      return this.http.get<any[]>(this.APIUrl + 'Countries/Active'); //Charger tous les countries actifs seulement
  }
  
}
