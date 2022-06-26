import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uri = 'http://localhost:4200/api';
  token: any;

  constructor() {}

  public get logIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
