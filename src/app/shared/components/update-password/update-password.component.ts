import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControlOptions,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent {
  messageError: string = '';
  isLoading: boolean = false;

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private _toastr: ToastrService,
    private location: Location
  ) {}

  updatePassForm: FormGroup = this._FormBuilder.group(
    {
      passwordCurrent: [null, [Validators.required]],

      password: [null, [Validators.required]],
      passwordConfirm: [null],
    },
    { validator: [this.passMatch] } as FormControlOptions
  );

  passMatch(group: FormGroup): void {
    let password = group.get('newPassword');
    let confirmPass = group.get('confirmPass');

    if (confirmPass?.value == null) {
      confirmPass?.setErrors({ required: true });
    } else if (confirmPass?.value !== password?.value) {
      confirmPass?.setErrors({ mismatch: true });
    }
  }

  updatePassword(): void {
    console.log(this.updatePassForm.value);

    this._AuthService.updatePassword(this.updatePassForm.value).subscribe({
      next: (res) => {
        this._AuthService.decodeUserData(res.token, res.role);
        this.showToastrSuccessful();
      },
      error: (err) => {
        this.messageError = err.error.message;
        this.showToastrError();
      },
    });
  }

  showToastrSuccessful(): void {
    this._toastr.success('', 'Password Updated Successfully', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
    });
  }

  showToastrError(): void {
    this._toastr.error('', `${this.messageError}`, {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
    });
  }

  goBack(): void {
    this.location.back();
  }
}
