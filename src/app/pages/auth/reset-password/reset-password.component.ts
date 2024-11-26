import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  messageError: string = '';
  isLoading: boolean = false;

  constructor(private _FormBuilder: FormBuilder) {}

  resetPassForm: FormGroup = this._FormBuilder.group(
    {
      password: [
        null,
        [Validators.required, Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)],
      ],
      confirmPass: [null],
    },
    { validator: [this.passMatch] } as FormControlOptions
  );

  passMatch(group: FormGroup): void {
    let password = group.get('password');
    let confirmPass = group.get('confirmPass');

    if (confirmPass?.value == null) {
      confirmPass?.setErrors({ required: true });
    } else if (confirmPass?.value !== password?.value) {
      confirmPass?.setErrors({ mismatch: true });
    }
  }

  resetPassTest(): void {
    console.log('Password Reset');
  }
}
