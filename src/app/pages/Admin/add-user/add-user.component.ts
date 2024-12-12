import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  messageError: string = '';
  isLoading: boolean = false;

  constructor(
    private _UserService: UsersService,
    private _FormBuilder: FormBuilder,
    private _Toastr: ToastrService,
    private _Router: Router
  ) {}

  addUserForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    username: ['', Validators.required],
    role: ['', Validators.required],
  });

  addUser(): void {
    if (this.addUserForm.valid) {
      const role = this.addUserForm.get('role')?.value;
      const username = this.addUserForm.get('username')?.value;

      this._UserService.adduser(this.addUserForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 'success') {
            this._Router.navigate([`./admin/users/${role}`]);
            this._Toastr.success('', `${username} Added Successfully`, {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true,
            });
          }
        },

        error: (err) => {
          if (err.error?.error?.statusCode === 500) {
            this._Toastr.error('', 'This Email is already exist', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true,
            });
          }
        },
      });
    } else {
      this._Toastr.error('', 'form is invalid', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true,
      });
    }
  }
}
