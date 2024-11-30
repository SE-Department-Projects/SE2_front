import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  messageError: string = '';
  isLoading: boolean = false;

  constructor(private _FormBuilder: FormBuilder) {}

  addUserForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    Username: ['', Validators.required],
    role: ['', Validators.required],
  });

  addUser(): void {
    if (this.addUserForm.valid) {
      console.log('Log In');
      console.log(this.addUserForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
