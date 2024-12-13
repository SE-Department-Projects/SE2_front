import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketService } from 'src/app/core/services/web-socket.service';

@Component({
  selector: 'app-observer-layout',
  templateUrl: './observer-layout.component.html',
  styleUrls: ['./observer-layout.component.css'],
})
export class ObserverLayoutComponent {
  constructor(
    private _router: Router,
    private webSocketService: WebSocketService
  ) {}
  message?: string;

  ngOnInit() {
    // Subscribe to incoming WebSocket messages
    this.webSocketService.messages.subscribe((message) => {
      this.message = message;
      console.log('Received message:', message);
    });
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this._router.navigate(['/login']);
  }
}
