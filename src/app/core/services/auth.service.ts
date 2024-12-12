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
    console.log(role);
    this.userLoginData.role = role;

    localStorage.setItem('loggedInUser', JSON.stringify(this.userLoginData));
    console.log(localStorage.getItem('loggedInUser'));
  }

  updatePassword(data: any): Observable<any> {
    return this._HttpClient.patch(`${this.apiUrl}users/updatePassword`, data);
  }

  isLoggedIn(): boolean {
    let token = localStorage.getItem('loggedInUser');
    let parsedToken = token ? JSON.parse(token) : null;
    if (parsedToken.token) {
      return !this.isTokenExpired(parsedToken.token);
    }
    return false;
  }

  private isTokenExpired(token: string): boolean {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      return true;
    }
  }

  hasRole(roles: string[]): boolean {
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );
    const userRole = loggedInUser?.role;
    return roles.includes(userRole || '');
  }
}
