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
  tableActions = [
    { lable: 'eye', icon: 'eye' },
    { icon: 'edit' },
    { icon: 'trash' },
  ];

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

  actionClick(event: { action: { label: string; icon: string }; row: any }) {
    console.log(event);
    const action = event.action;
    const row = event.row;
    switch (action.icon) {
      case 'eye':
        this.router.navigate(['/userProfile',  row.id]); // Use row data (user data)
        break;
      case 'edit':
        // this.router.navigate(['/admin/editUser', row.id]);
        break;
      case 'trash':
        if (confirm('Are you sure you want to delete this user?')) {
          // Handle delete functionality here, using row data
        }
        break;
      default:
        console.log('Unknown action', action);
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
