import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _UsersService: UsersService,
    private _Toastr: ToastrService
  ) {}

  users: any[] = [];
  totalCount: Number = 0;
  role: string | null = '';
  searchText: string = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.role = params.get('role');
      console.log(this.role);
      if (this.role) {
        this.users = this.getAllUsers(this.role);
      }
    });
  }

  tableColumns = [
    { field: 'number', header: '#' },
    { field: '_id', header: 'ID' },
    { field: 'username', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'isLocked', header: 'Is Locked' },
    { field: 'CreatedAt', header: 'Created At' },
  ];

  // Example data
  tableData = [];

  // Define actions
  tableActions = [{ icon: 'edit' }, { icon: 'trash' }];

  actionClick(event: { action: { label: string; icon: string }; row: any }) {
    console.log(event);
    const action = event.action;
    const row = event.row;
    switch (action.icon) {
      case 'edit':
        this.router.navigate([`/admin/userDetails/${row._id}`]);
        break;
      case 'trash':
        this.deleteUser(row.id, row.username);
        break;
      default:
        console.log('Unknown action', action);
    }
  }

  getAllUsers(role: string): any {
    this._UsersService.GetAllByRole(role, this.searchText).subscribe({
      next: (response) => {
        if (response.status === 'success') {
          console.log(response);
          this.users = response.data.users.map((user: User, index: number) => ({
            ...user,
            number: index + 1,
            CreatedAt: user.CreatedAt.slice(0, 10),
          }));
          this.totalCount = response.results;
        }
      },
      error: (err) => {
        this.users = [];
        this.totalCount = 0;
      },
    });
  }

  deleteUser(id: string, username: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this._UsersService.deleteUserById(id).subscribe({
        next: (response) => {
          if (!response) {
            if (this.role) {
              this.users = this.getAllUsers(this.role);
              this._Toastr.success('', `${username} deleted successfully`, {
                timeOut: 4000,
                positionClass: 'toast-top-right',
                progressBar: true,
                closeButton: true,
              });
            }
          }
        },
      });
    }
  }
}
