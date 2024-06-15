import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from 'app/Config/Config';
import { Router } from '@angular/router';
import { Badges } from 'app/Models/badges';

@Injectable({
    providedIn: 'root',
})
export class BadgesService {
    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();
    constructor(private http: HttpClient, public router: Router) {}

    getAllBadges(): Observable<Badges[]> {
        return this.http.get<Badges[]>(this.APIUrl + 'Badges');
    }

    getById(id: any): any {
        return this.http.get(this.APIUrl + 'Badges/' + id);
    }

    add(val: any): any {
        return this.http.post(this.APIUrl + 'Badges', val);
    }

    update(val: any): any {
        return this.http.put(this.APIUrl + 'Badges', val);
    }

    delete(val: any): any {
        return this.http.delete(this.APIUrl + 'Badges/' + val);
    }

    uploadPhoto(val: any): any {
        return this.http.post(this.APIUrl + 'badges/images', val);
    }
}