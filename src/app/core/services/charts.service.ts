import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  private apiUrl = environment.apiUrl;

  constructor(private _HttpClient: HttpClient) {}

  getEventTypeAnalysis(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}eventTypeAnalysis`);
  }

  getRecentEventsAnalysis(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}recentEventsAnalysis`);
  }

  getTopFiveFreqLocations(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}top-5-freqLocations`);
  }

  getRobotBehaviorRanks(): Observable<any> {
    return this._HttpClient.get(`${this.apiUrl}robotBehaviorRanks`);
  }
}
