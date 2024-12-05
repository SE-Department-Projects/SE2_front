import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  constructor(private _HttpClient: HttpClient) {}

  user: any = {
    email: 'admin@gmail.com',
    password: 'newPass12',
  };

  login(userCredential: any): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}users/login`, userCredential);
  }
}
