import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;

  constructor() {
    // Create a WebSocket connection
    this.socket$ = webSocket('ws://localhost:3000');
  }

  // Function to send messages to the server
  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  // Observable that listens for incoming messages
  get messages(): Observable<any> {
    return this.socket$.asObservable();
  }
}
