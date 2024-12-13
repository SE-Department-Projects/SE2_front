import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.apiUrl;
  constructor(private _HttpClient: HttpClient) {}

  adduser(user: AddUser): Observable<any> {
    return this._HttpClient.post(`${this.apiUrl}users`, user);
  }

  GetlatestByRole(): Observable<any> {
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTM5ZWY4ZTYwN2I5ZjU5MzQ0MjYzMCIsImlhdCI6MTczMzY4MzY5MiwiZXhwIjoxNzQxNDU5NjkyfQ.GzZ_gmUUoyW8E5TZ5j2W2OCHoKLlGWx9hQJOaNrsbLw`
    // );
    return this._HttpClient.get(`${this.apiUrl}users/latestbyrole`);
  }

  GetAllByRole(role: string, name: string): Observable<any> {
    return this._HttpClient.get(
      `${this.apiUrl}users//getAll/${role}?name=${name}`
    );
  }

  deleteUserById(id: string) {
    return this._HttpClient.delete(`${this.apiUrl}users/deleteUser/${id}`);
  }

  getCurrentUser(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}users/myInfo`);
  }

  getUser(id: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}users/${id}`);
  }

  updateProfile(data: any): Observable<any> {
    return this._HttpClient.patch(`${this.apiUrl}users/updateMe`, data);
  }
}
