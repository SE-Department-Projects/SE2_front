import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  messageError: string = '';
  isLoading: boolean = false;

  user: any;
  userForm: FormGroup;

  ngOnInit(): void {
    this.getUser();
  }

  constructor(
    private _FormBuilder: FormBuilder,
    private _UsersService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private location: Location
  ) {
    this.userForm = this._FormBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
    });
  }

  loadData() {
    this.userForm = this._FormBuilder.group({
      email: [this.user.email, Validators.required],
      username: [this.user.username, Validators.required],
    });
  }

  getUser() {
    this._UsersService.getCurrentUser().subscribe({
      next: (res) => {
        this.user = res.data.user;
        this.loadData();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateProfile(): void {
    if (this.userForm.valid) {
      this.isLoading = true;
      console.log(this.userForm.value);
      this._UsersService.updateProfile(this.userForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.user = res.data.user;
          this.showToastrSuccessful();
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Error updating profile:', err);
          this.messageError = 'Failed to update profile.';
        },
      });
    } else {
      this.messageError = 'Please ensure all fields are filled correctly.';
    }
  }

  showToastrSuccessful(): void {
    this.toastr.success('', 'Profile Updated Successfully', {
      timeOut: 5000,
      positionClass: 'toast-top-right',
      progressBar: true,
      closeButton: true,
    });
  }

  navigateTo(path: String): void {
    this.router.navigate([path]);
  }

  goBack(): void {
    this.location.back();
  }
}
