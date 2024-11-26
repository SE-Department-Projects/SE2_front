import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(private route: ActivatedRoute) {}
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
  tableActions = [
    // { label: 'Edit', icon: 'edit' },
    // { label: 'Delete', icon: 'trash' },
  ];

  users: any[] = [];
  role: string | null = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.role = params.get('role');
      if (this.role) {
        this.getAllUsers(this.role);
      }
    });
  }

  getAllUsers(role: string) {
    console.log('Fetching all users with role:', role);
    if (role === 'admins') {
      this.users = [
        { id: 1, name: 'Admin 1', email: 'admin1@example.com' },
        { id: 2, name: 'Admin 2', email: 'admin2@example.com' },
      ];
    }
  }

  addUser() {
    console.log('add user');
  }
}