import { Component } from '@angular/core';

@Component({
  selector: 'app-maintainance-log',
  templateUrl: './maintainance-log.component.html',
  styleUrls: ['./maintainance-log.component.css'],
})
export class MaintainanceLogComponent {
  // Table columns
  tableColumns = [
    { field: 'jobID', header: 'Job ID' },
    { field: 'jobDescription', header: 'Job Description' },
    { field: 'startTime', header: 'Start Time' },
    { field: 'endTime', header: 'End Time' },
    { field: 'status', header: 'Status' },
  ];

  // Table data
  tableData = [
    {
      jobID: 1,
      jobDescription: 'Sensor malfunction in Zone A',
      startTime: '2024-11-28 08:00:00',
      endTime: '2024-11-28 10:00:00',
      status: 'Resolved',
    },
    {
      jobID: 2,
      jobDescription: 'Communication failure in Zone B',
      startTime: '2024-11-28 11:00:00',
      endTime: null,
      status: 'Unresolved',
    },
    {
      jobID: 3,
      jobDescription: 'Battery replacement in Zone C',
      startTime: '2024-11-28 09:30:00',
      endTime: '2024-11-28 10:30:00',
      status: 'Resolved',
    },
    {
      jobID: 4,
      jobDescription: 'Camera alignment issue in Zone D',
      startTime: '2024-11-28 13:00:00',
      endTime: '2024-11-28 15:00:00',
      status: 'Resolved',
    },
    {
      jobID: 5,
      jobDescription: 'Robot not responding in Zone E',
      startTime: '2024-11-28 12:00:00',
      endTime: null,
      status: 'Unresolved',
    },
    {
      jobID: 6,
      jobDescription: 'Motor overheating in Zone F',
      startTime: '2024-11-28 14:00:00',
      endTime: null,
      status: 'Unresolved',
    },
    {
      jobID: 7,
      jobDescription: 'Unexpected shutdown in Zone G',
      startTime: '2024-11-28 10:00:00',
      endTime: '2024-11-28 11:30:00',
      status: 'Resolved',
    },
    {
      jobID: 8,
      jobDescription: 'Pathfinding error in Zone H',
      startTime: '2024-11-28 15:00:00',
      endTime: null,
      status: 'Unresolved',
    },
    {
      jobID: 9,
      jobDescription: 'Proximity sensor calibration in Zone I',
      startTime: '2024-11-28 16:00:00',
      endTime: null,
      status: 'Unresolved',
    },
    {
      jobID: 10,
      jobDescription: 'Network connectivity in Zone J',
      startTime: '2024-11-28 07:30:00',
      endTime: '2024-11-28 09:00:00',
      status: 'Resolved',
    },
    {
      jobID: 11,
      jobDescription: 'Hardware diagnostic in Zone K',
      startTime: '2024-11-28 16:30:00',
      endTime: null,
      status: 'Unresolved',
    },
  ];

  tableActions = [{ label: 'Send Report', icon: 'envelope' }];

  handleAction(event: { action: string; row: any }): void {
    const { action, row } = event;
    if (action === 'Send Report') {
      this.sendReport(row);
    }
  }

  sendReport(row: any): void {
    console.log(`Send Report: Job ID ${row.jobID}`);
  }
}
