import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = webSocket('ws://localhost:3001');
  }

  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  get messages(): Observable<any> {
    return this.socket$.asObservable();
  }
}
