import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getActiveConsumer } from '@angular/core/primitives/signals';
import { Router } from '@angular/router';
import { Config } from 'app/Config/Config';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CategoriesService {
    public Config: Config = new Config();

    APIUrl: string = this.Config.getAPIPath();

    constructor(private http: HttpClient, public router: Router) {}

    getCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.APIUrl + 'Categories'); //Charger tous les countries, fihom li manest3rfoush bihom
    }

    getActiveCategories(): Observable<any[]> {
        return this.http.get<any[]>(this.APIUrl + 'Categories/Active'); //Charger tous les countries actifs seulement
    }

    getCategoryId(val: any): any {
        console.log(this.APIUrl + 'Categories/' + val);
        return this.http.get(this.APIUrl + 'Categories' + val);
    }

    getEditCategory(id: number): any {
        console.log(this.APIUrl + 'Categories/' + id);
        return this.http.get(this.APIUrl + 'Categories/GetEdit/' + id);
    }

    addCategory(val: any): any {
        return this.http.post(this.APIUrl + 'Categories', val);
    }

    updateCategory(val: any): any {
      return this.http.put(this.APIUrl + 'Categories/', val);
    }

    updateActiveCategory(id: number, active : number): any {
        return this.http.put(this.APIUrl + 'Categories/EnableDisable?id='+id+'&Active='+active,id);
    }

    deleteCategory(val: any): any {
        return this.http.delete(this.APIUrl + 'Categories/' + val);
    }

    uploadPhoto(val: any): any {
      return this.http.post(this.APIUrl + 'categories/images', val);
  }
}