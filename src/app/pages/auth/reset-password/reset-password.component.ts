import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  messageError: string = '';
  isLoading: boolean = false;
  token: string = '';

  ngOnInit(): void {
    this.token = this._ActivatedRoute.snapshot.url[1]?.path;
  }
  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _Router: Router,
    private _AuthService: AuthService
  ) {}

  resetPassForm: FormGroup = this._FormBuilder.group(
    {
      password: [
        null,
        [
          Validators.required,
          // Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)
        ],
      ],
      passwordConfirm: [null],
    },
    { validator: [this.passMatch] } as FormControlOptions
  );

  passMatch(group: FormGroup): void {
    let password = group.get('password');
    let passwordConfirm = group.get('passwordConfirm');

    if (passwordConfirm?.value == null) {
      passwordConfirm?.setErrors({ required: true });
    } else if (passwordConfirm?.value !== password?.value) {
      passwordConfirm?.setErrors({ mismatch: true });
    }
  }

  resetPassTest(): void {
    if (this.resetPassForm.valid) {
      console.log('Password Reset');
      console.log(this.resetPassForm);
      this._AuthService
        .resetPassword(this.token, this.resetPassForm.value)
        .subscribe({
          next: (res) => {
            if (res.status === 'success') {
              this._AuthService.toggleLockUser({})
              this._Router.navigate(['login']);
            }
            console.log(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else {
      this.resetPassForm.markAllAsTouched();
    }
  }
}
