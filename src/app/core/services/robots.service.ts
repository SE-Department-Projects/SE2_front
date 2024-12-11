import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RobotsService {
  private apiUrl = environment.apiUrl;
  constructor(private _HttpClient: HttpClient) {}

  getAllRobots(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}robots/`);
  }
}
