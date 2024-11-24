import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  messageError: string = '';
  isLoading: boolean = false;

  constructor(private _FormBuilder: FormBuilder) {}

  resetPassForm: FormGroup = this._FormBuilder.group({
    password: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],
    confirmPass: [
      null,
      [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
    ],
  });

  resetPassTest(): void {
    console.log('Password Reset');
  }
}
