import { Component } from '@angular/core';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.css'],
})
export class UsersManagementComponent {
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

    
  
}
