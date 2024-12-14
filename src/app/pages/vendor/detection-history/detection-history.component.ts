import { Component, OnInit } from '@angular/core';
import { RobotsService } from 'src/app/core/services/robots.service';
import { WebSocketService } from 'src/app/core/services/web-socket.service';

@Component({
  selector: 'app-detection-history',
  templateUrl: './detection-history.component.html',
  styleUrls: ['./detection-history.component.css'],
})
export class DetectionHistoryComponent implements OnInit {
  tableColumns = [
    { field: '_id', header: 'ID' },
    { field: 'detectionTime', header: 'Time' },
    { field: 'robotId', header: 'Robot ID' },
    { field: 'detectionType', header: 'Detection Type' },
  ];

  tableData: any[] = [];
  totalDetections: number = 0;

  constructor(
    private _RobotsService: RobotsService,
    private _WebSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.getAllDetections();
    this.listenForWebSocketUpdates();
  }

  getAllDetections(): void {
    this._RobotsService.getDetections().subscribe({
      next: (res) => {
        this.tableData = res.data.detections;
        this.totalDetections = this.tableData.length;
      },
      error: (err) => {
        console.log(err.error.message);
      },
    });
  }

  listenForWebSocketUpdates(): void {
    this._WebSocketService.messages.subscribe((message: any) => {
      const { type, fullDocument, collection } = message;

      if (collection === 'detections') {
        if (type === 'insert') {
          this.tableData.push(fullDocument);
          this.totalDetections++;
        } else if (type === 'delete') {
          console.log(message.key);
          const idToDelete = message.key;
          this.tableData = this.tableData.filter(
            (data) => data.id !== idToDelete
          );
          this.totalDetections--;
        }
      }
    });
  }
}
