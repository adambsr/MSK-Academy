import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'app/Config/Config';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class ExercicesQuestionsService {
    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();
    constructor(private http: HttpClient, public router: Router) {}

    GetQuestionsByExercice(id: any): any {
        return this.http.get(this.APIUrl + 'Questions/' + id);
    }

    add(val: any): any {
        return this.http.post(this.APIUrl + 'Questions', val);
    }

    update(val: any): any {
        return this.http.put(this.APIUrl + 'Questions', val);
    }

    delete(val: any): any {
        return this.http.delete(this.APIUrl + 'Questions/' + val);
    }
}