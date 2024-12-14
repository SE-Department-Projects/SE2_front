import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RobotsService } from 'src/app/core/services/robots.service';

@Component({
  selector: 'app-add-robot',
  templateUrl: './add-robot.component.html',
  styleUrls: ['./add-robot.component.css'],
})
export class AddRobotComponent {
  messageError: string = '';
  isLoading: boolean = false;

  constructor(
    private _RobotsService: RobotsService,
    private _FormBuilder: FormBuilder,
    private _Toastr: ToastrService,
    private _Router: Router
  ) {}

  addRobotForm: FormGroup = this._FormBuilder.group({
    id: ['', [Validators.required]],
  });

  addRobot(): void {
    if (this.addRobotForm.valid) {
      this._RobotsService.createRobot(this.addRobotForm.value).subscribe({
        next: (res) => {
          if (res.status === 'success') {
            this._Router.navigate([`./admin/robotConfiguration`]);
            this._Toastr.success('', `Robot Added Successfully`, {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true,
            });
          }
        },

        error: (err) => {
          if (err.error?.error?.statusCode === 500) {
            this._Toastr.error('', 'Robot With Same ID Exists', {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
              closeButton: true,
            });
          }
        },
      });
    } else {
      this._Toastr.error('', 'Please Enter The ID', {
        timeOut: 3000,
        positionClass: 'toast-top-right',
        progressBar: true,
        closeButton: true,
      });
    }
  }
}
