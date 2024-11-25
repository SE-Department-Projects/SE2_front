import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent {
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
  ];

  // Define actions
  tableActions = [
    { label: 'Edit', icon: 'edit' },
    { label: 'Delete', icon: 'trash' },
  ];

  onTableAction(event: { action: string; row: any }) {
    console.log(`${event.action} clicked for`, event.row);
    if (event.action === 'Edit') {
      this.editRow(event.row);
    } else if (event.action === 'Delete') {
      this.deleteRow(event.row);
    }
  }

  editRow(row: any) {
    console.log('Editing row:', row);
  }

  deleteRow(row: any) {
    console.log('Deleting row:', row);
  }
}
