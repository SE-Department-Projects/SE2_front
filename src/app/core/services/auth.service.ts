import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  userLoginData: any;

  constructor(private _HttpClient: HttpClient) {
    this.userLoginData = {};
  }

  login(userCredential: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}users/login`, userCredential);
  }

  decodeUserData(token: string, role: string) {
    let decodeToken: any = jwtDecode(token);

    this.userLoginData.token = token;
    this.userLoginData.tokenDetails = decodeToken;
    this.userLoginData.role = role;

    localStorage.setItem('loggedInUser', JSON.stringify(this.userLoginData));
  }
}
