import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'app/Config/Config';
import { Observable } from 'rxjs';
import { Candidates } from 'app/Models/candidates';
import { Tutors } from 'app/Models/tutors';
import { Courses } from 'app/Models/courses';
import { Categories } from 'app/Models/categories';
import { Badges } from 'app/Models/badges';

@Injectable({
    providedIn: 'root',
})
export class StatisticsService {
    public Config: Config = new Config();

    APIUrl: string = this.Config.getAPIPath();

    constructor(private http: HttpClient, public router: Router) {}

    getCountCandidates(): Observable<Candidates[]> {
        return this.http.get<Candidates[]>(
            this.APIUrl + 'Statistics/CountCandidates'
        );
    }

    getCountCandidatesByGender(): Observable<Candidates[]> {
        return this.http.get<Candidates[]>(
            this.APIUrl + 'Statistics/CountCandidatesByGender'
        );
    }

    getCountCandidatesByAge(): Observable<Candidates[]> {
        return this.http.get<Candidates[]>(
            this.APIUrl + 'Statistics/CountCandidatesByAge'
        );
    }

    getCountTutors(): Observable<Tutors[]> {
        return this.http.get<Tutors[]>(this.APIUrl + 'Statistics/CountTutors');
    }

    getCountTutorsByGender(): Observable<Tutors[]> {
        return this.http.get<Tutors[]>(
            this.APIUrl + 'Statistics/CountTutorsByGender'
        );
    }

    getCountTutorsByAge(): Observable<Tutors[]> {
        return this.http.get<Tutors[]>(
            this.APIUrl + 'Statistics/CountTutorsByAge'
        );
    }

    getCountCategories(): Observable<Categories[]> {
        return this.http.get<Categories[]>(
            this.APIUrl + 'Statistics/CountCategories'
        );
    }

    getCountCourses(): Observable<Courses[]> {
        return this.http.get<Courses[]>(
            this.APIUrl + 'Statistics/CountCourses'
        );
    }

    getCountBadges(): Observable<Badges[]> {
        return this.http.get<Badges[]>(this.APIUrl + 'Statistics/CountBadges');
    }
}
