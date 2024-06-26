import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'app/Config/Config';
import { Certificates } from 'app/Models/certificates';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificatesService {
  public Config: Config = new Config();
  APIUrl: string = this.Config.getAPIPath();
  constructor(private http: HttpClient, public router: Router) {}
  // Fetch all certificates
  getAllCertificates(): Observable<Certificates[]> {
      return this.http.get<Certificates[]>(this.APIUrl + 'Certificates');
  }

  getById(IdCertificate: number): any {
      return this.http.get(this.APIUrl + 'Certificates/' + IdCertificate);
  }

  printCertificate(IdCertificate: number): Observable<Blob> {
    return this.http.get(`${this.APIUrl}/${IdCertificate}/print`, { responseType: 'blob' });
  }
}
