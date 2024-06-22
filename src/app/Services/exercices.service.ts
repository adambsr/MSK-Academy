import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'app/Config/Config';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ExercicesService {
    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();
    constructor(private http: HttpClient, public router: Router) {}

    getExerciceByCourse(id: any): any {
        return this.http.get(this.APIUrl + 'Exercices/' + id);
    }

    add(val: any): any {
        return this.http.post(this.APIUrl + 'Exercices', val);
    }

    update(val: any): any {
        return this.http.put(this.APIUrl + 'Exercices', val);
    }

    delete(val: any): any {
        return this.http.delete(this.APIUrl + 'Exercices/' + val);
    }
}