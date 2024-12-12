import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-technician-layout',
  templateUrl: './technician-layout.component.html',
  styleUrls: ['./technician-layout.component.css'],
})
export class TechnicianLayoutComponent {
  constructor(private _router: Router) {}
  logout(): void {
    localStorage.removeItem('loggedInUser');
    this._router.navigate(['/login']);
  }
}
