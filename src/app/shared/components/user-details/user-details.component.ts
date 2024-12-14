import { Location } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { id } from '@swimlane/ngx-charts';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  constructor(
    private _FormBuilder: FormBuilder,
    private _UsersService: UsersService,
    private toastr: ToastrService,
    private router: Router,
    private _location: Location,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.userForm = this._FormBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
    });
  }

  messageError: string = '';
  isLoading: boolean = false;

  user: any;
  userForm: FormGroup;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        let userId: any = params.get('id');

        this.getUserProfile(userId);
      },
    });
  }

  getUserProfile(id: string) {
    this._UsersService.getUser(id).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.user = response.data.user;
          this.loadData();
        }
      },
    });
  }

  loadData() {
    this.userForm = this._FormBuilder.group({
      email: [this.user.email, Validators.required],
      username: [this.user.username, Validators.required],
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
    this._location.back();
  }
}
