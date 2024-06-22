import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'app/Config/Config';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class PropositionsService {
    public Config: Config = new Config();
    APIUrl: string = this.Config.getAPIPath();
    constructor(private http: HttpClient, public router: Router) {}

    GetPropositionsByQuestion(id: any): any {
        return this.http.get(this.APIUrl + 'Propositions/' + id);
    }

    add(val: any): any {
        return this.http.post(this.APIUrl + 'Propositions', val);
    }

    update(val: any): any {
        return this.http.put(this.APIUrl + 'Propositions', val);
    }

    delete(val: any): any {
        return this.http.delete(this.APIUrl + 'Propositions/' + val);
    }
}