import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  // Define columns
  tableColumns = [
    { field: 'id', header: 'ID' },
    { field: 'name', header: 'Name' },
    { field: 'email', header: 'Email' },
  ];

  // Example data
  tableData = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  // Define actions
  tableActions = [{ icon: 'eye' }, { icon: 'edit' }, { icon: 'trash' }];

  // users: any[] = [];
  role: string | null = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.role = params.get('role');
      if (this.role) {
        this.getAllUsers(this.role);
      }
    });
  }

  actionClick(action: { icon: string; data: any }): void {
    console.log('Aaaaaaaaa');

    if (action.icon === 'eye') {
      console.log('Aaaaaaaaa');
      // Navigate to the user profile page with the user ID (e.g., user/1)
      this.router.navigate(['/user-profile']);
    }
  }
  getAllUsers(role: string) {
    console.log('Fetching all users with role:', role);
    if (role === 'admins') {
      // this.users = [
      //   { id: 1, name: 'Admin 1', email: 'admin1@example.com' },
      //   { id: 2, name: 'Admin 2', email: 'admin2@example.com' },
      // ];
    }
  }
}
