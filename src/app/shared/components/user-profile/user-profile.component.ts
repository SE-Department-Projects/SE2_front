import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent {
  messageError: string = '';
  isLoading: boolean = false;

  user: any;
  userForm: any;
  ngOnInit(): void {
    this.loadData();
  }

  constructor(private _FormBuilder: FormBuilder) {}

  loadData() {
    this.user = {
      email: 'amir@gmail.com',
      userName: 'Amirrr',
      role: 'Admin',
    };

    this.userForm = this._FormBuilder.group({
      email: [this.user.email, [Validators.required, Validators.email]],
      userName: [this.user.userName, Validators.required],
      role: [this.user.role, Validators.required],
    });
  }
}
