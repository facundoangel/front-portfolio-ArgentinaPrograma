import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  public get logIn(): boolean {
    return localStorage.getItem('token') !== null;
  }
}
