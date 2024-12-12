import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-observer-layout',
  templateUrl: './observer-layout.component.html',
  styleUrls: ['./observer-layout.component.css'],
})
export class ObserverLayoutComponent {
  constructor(private _router: Router) {}
  logout(): void {
    localStorage.removeItem('loggedInUser');
    this._router.navigate(['/login']);
  }
}
