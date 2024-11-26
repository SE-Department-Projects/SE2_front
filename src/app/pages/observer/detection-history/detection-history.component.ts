import { Component } from '@angular/core';

@Component({
  selector: 'app-detection-history',
  templateUrl: './detection-history.component.html',
  styleUrls: ['./detection-history.component.css'],
})
export class DetectionHistoryComponent {
  // Define columns
  tableColumns = [
    { field: 'id', header: 'ID' },
    { field: 'time', header: 'Time' },
    { field: 'location', header: 'Location' },
  ];

  // Example data
  tableData = [
    { id: 1, time: '2024-11-25 14:23:00', location: 'Berlin, Germany' },
    { id: 2, time: '2024-11-25 15:10:00', location: 'Munich, Germany' },
    { id: 3, time: '2024-11-25 16:45:00', location: 'Hamburg, Germany' },
    { id: 4, time: '2024-11-25 17:30:00', location: 'Frankfurt, Germany' },
    { id: 5, time: '2024-11-25 18:00:00', location: 'Stuttgart, Germany' },
    { id: 6, time: '2024-11-25 18:30:00', location: 'Cologne, Germany' },
    { id: 7, time: '2024-11-25 19:15:00', location: 'Düsseldorf, Germany' },
    { id: 8, time: '2024-11-25 20:00:00', location: 'Leipzig, Germany' },
    { id: 9, time: '2024-11-25 20:45:00', location: 'Dresden, Germany' },
    { id: 10, time: '2024-11-25 21:30:00', location: 'Bremen, Germany' },
  ];
}
