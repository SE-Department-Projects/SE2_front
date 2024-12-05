import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { count } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  messageError: string = '';
  isLoading: boolean = false;
  counter = 1;
  role = 'admin';

  constructor(
    private _FormBuilder: FormBuilder,
    private _AuthService: AuthService,
    private toastr: ToastrService,
    private _Router: Router
  ) {}

  ngOnInit(): void {
    this.counter = 1;
  }

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [
      null,
      [
        Validators.required,
        // Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/)
      ],
    ],
  });

  handleLogin(): void {
    if (this.loginForm.valid) {
      console.log(this.counter);

      if (this.counter === 2) {
        this.showToastrWarning();
      }

      if (this.counter === 3) {
        this.redirectToCheckEmail();
      }

      this._AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.status === 'success') {
            localStorage.setItem('token', response.token);
            this.redirectBasedOnRole();
          }
        },
        error: (err) => {
          if (err.error.status === 'fail') {
            this.messageError = err.error.message;
          }
          this.counter++;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private redirectBasedOnRole(): void {
    this.counter = 1;

    if (this.role === 'admin') {
      this._Router.navigate(['/admin']);
    } else if (this.role === 'technician') {
      this._Router.navigate(['/technician']);
    } else if (this.role === 'observer') {
      this._Router.navigate(['/observer']);
    }
  }

  private redirectToCheckEmail(): void {
    this.counter = 1;
    this._Router.navigate(['/checkEmail']);
  }

  private showToastrWarning(): void {
    this.toastr.warning(
      '',
      'The next trial is the last, and we will prevent you from logging in and send an email to reset your password.',
      {
        timeOut: 5000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true,
      }
    );
  }
}
