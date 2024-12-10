import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
})
export class UsersManagementComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _UsersService: UsersService
  ) {}

  ngOnInit(): void {
    this.getLatestAdmins();
    this.getLatestTechnicians();
    this.getLatestVendors();
    this.getLatestObservers();
  }

  // Define columns
  tableColumns = [
    { field: 'number', header: '#' },
    { field: 'username', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'CreatedAt', header: 'Created At' },
  ];

  adminsTableData: User[] = [];
  technicianTableData: User[] = [];
  vendorsTableData: User[] = [];
  observersTableData: User[] = [];

  totalAdminsCount: number = 0;
  totalTechnicianCount: number = 0;
  totalVendorsCount: number = 0;
  totalObserverCount: number = 0;

  // Define actions
  tableActions = [];

  getLatestAdmins(): any {
    this._UsersService.GetlatestByRole('admin').subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.adminsTableData = response.data.users.map(
            (user: User, index: number ) => ({
              ...user,
              number: index + 1,
            })
          );
          this.totalAdminsCount = response.results;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getLatestTechnicians(): any {
    this._UsersService.GetlatestByRole('technician').subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.technicianTableData = response.data.users.map(
            (user: User, index: number) => ({
              ...user,
              number: index + 1,
            })
          );
          this.totalTechnicianCount = response.results;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getLatestVendors(): any {
    this._UsersService.GetlatestByRole('vendor').subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.vendorsTableData = response.data.users.map(
            (user: User, index: number) => ({
              ...user,
              number: index + 1,
            })
          );
          this.totalVendorsCount = response.results;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getLatestObservers(): any {
    this._UsersService.GetlatestByRole('observer').subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.observersTableData = response.data.users.map(
            (user: User, index: number) => ({
              ...user,
              number: index + 1,
            })
          );
          this.totalObserverCount = response.results;
          console.log(this.totalObserverCount);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
