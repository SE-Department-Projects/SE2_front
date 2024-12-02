import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  messageError: string = '';
  isLoading: boolean = false;

  constructor(
    private _FormBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  addUserForm: FormGroup = this._FormBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    Username: ['', Validators.required],
    role: ['', Validators.required],
  });

  addUser(): void {
    if (this.addUserForm.valid) {
      const role = this.addUserForm.get('role')?.value;
      this.router.navigate([`./admin/users/${role}`]);
      this.toastr.success('', `${role} Added Successfully`, {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true,
      });
      console.log(this.addUserForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
