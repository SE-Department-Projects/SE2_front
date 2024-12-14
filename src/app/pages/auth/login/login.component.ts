import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  // handleLogin(): void {
  //   if (this.loginForm.valid) {
  //     console.log(this.counter);

  //     // Show warning on second attempt
  //     if (this.counter === 2) {
  //       this.showToastrWarning();
  //     }

  //     // Lock account on third attempt
  //     if (this.counter === 3) {
  //       this._AuthService
  //         .toggleLockUser({
  //           email: this.loginForm.value.email,
  //           isLocked: 1,
  //         })
  //         .subscribe({
  //           next: (response) => {
  //             if (response.status === 'success') {
  //               this.messageError =
  //                 'Your account is locked. Please check your email to reset your password.';
  //               this.redirectToCheckEmail();
  //             }
  //           },
  //           error: (err) => {
  //             console.error('Error locking user:', err);
  //           },
  //         });
  //       return; // Stop further processing after locking the account
  //     }

  //     // Attempt login
  //     this._AuthService.login(this.loginForm.value).subscribe({
  //       next: (response) => {
  //         if (response.status === 'success') {
  //           // Check if account is locked
  //           if (response.isLocked == 1) {
  //             this.messageError =
  //               'Your account is locked. Please check your email to reset your password.';
  //           } else {
  //             // Decode user data and redirect based on role
  //             this._AuthService.decodeUserData(response.token, response.role);
  //             this.redirectBasedOnRole(response.role);
  //             this.counter = 1; // Reset counter on successful login
  //           }
  //         }
  //       },
  //       error: (err) => {
  //         if (err.error.status === 'fail') {
  //           this.messageError = err.error.message;
  //         }
  //         this.counter++; // Increment counter on failed login
  //       },
  //     });
  //   } else {
  //     this.loginForm.markAllAsTouched();
  //   }
  // }

  handleLogin(): void {
    if (this.loginForm.valid) {
      console.log(this.counter);

      if (this.counter === 2) {
        this.showToastrWarning();
      }

      if (this.counter === 3) {
        console.log('counter is 3');
        this._AuthService
          .toggleLockUser({
            email: this.loginForm.value.email,
            isLocked: 1,
          })
          .subscribe({
            next: (response) => {
              this.counter = 1;
              if (response.status === 'success') {
                console.log(this.loginForm.value.email);
                this._AuthService
                  .fogetPassword(this.loginForm.value.email)
                  .subscribe({
                    next: (response) => {
                      if (response.status === 'success') {
                        this.redirectToCheckEmail();
                      }
                    },

                    error: (err) => {
                      console.log(err);
                    },
                  });
              }
            },

            error: (err) => {},
          });
      }

      this._AuthService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log(response);
          if (response.status === 'success') {
            this._AuthService.decodeUserData(response.token, response.role);
            console.log(response);
            if (response.isLocked == 1) {
              console.log('you are lockeddd!!!');
              this.messageError =
                'You Are Locked, Go To Email And Reset The Password!!';
            } else this.redirectBasedOnRole(response.role);
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

  private redirectBasedOnRole(role: string): void {
    this.counter = 1;

    if (role === 'admin') {
      this._Router.navigate(['/admin']);
    } else if (role === 'technician') {
      this._Router.navigate(['/technician']);
    } else if (role === 'vendor') {
      this._Router.navigate(['/vendor']);
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
