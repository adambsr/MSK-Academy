import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  getUserRole(): string {
    console.log(localStorage.getItem('IdRole'))
    return localStorage.getItem('IdRole') || '';
  }
}
