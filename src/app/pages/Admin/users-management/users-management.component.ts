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
    this._UsersService.GetlatestByRole().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.adminsTableData = response.data.admin.map(
            (user: User, index: number) => ({
              ...user,
              number: index + 1,
              CreatedAt: user.CreatedAt.slice(0, 10),
            })
          );
          this.totalAdminsCount = 5;

          this.vendorsTableData = response.data.vendor.map(
            (user: User, index: number) => ({
              ...user,
              number: index + 1,
              CreatedAt: user.CreatedAt.slice(0, 10),
            })
          );

          console.log(this.totalVendorsCount);
          this.totalVendorsCount = 5;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
