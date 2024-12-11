import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = environment.apiUrl;
  constructor(private _HttpClient: HttpClient) {}

  adduser() {}

  GetlatestByRole(role: string): Observable<any> {
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTM5ZWY4ZTYwN2I5ZjU5MzQ0MjYzMCIsImlhdCI6MTczMzY4MzY5MiwiZXhwIjoxNzQxNDU5NjkyfQ.GzZ_gmUUoyW8E5TZ5j2W2OCHoKLlGWx9hQJOaNrsbLw`
    // );
    return this._HttpClient.get(`${this.apiUrl}users/${role}`);
  }

  GetAllByRole(role: string): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}users/${role}`);
  }

  deleteUserById(id: string) {
    return this._HttpClient.delete(`${this.apiUrl}users/deleteUser/${id}`);
  }

  getCurrentUser(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}users/myInfo`);
  }

  updateProfile(data: any): Observable<any> {
    return this._HttpClient.patch(`${this.apiUrl}users/updateMe`, data);
  }
}
