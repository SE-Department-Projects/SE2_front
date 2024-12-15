import { Component } from '@angular/core';
import { ChartsService } from 'src/app/core/services/charts.service';
import { WebSocketService } from 'src/app/core/services/web-socket.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css'],
})
export class VendorDashboardComponent {
  detectionDetails: any[] = [];
  topFreqLocation: any[] = [];
  robotRanks: any[] = [];
  message?: string;

  constructor(
    private _ChartsService: ChartsService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.eventTypeAnalysis();
    this.getFreqLocations();
    this.robotBehaviorRanks();
    this.webSocketService.messages.subscribe((message) => {
      // this.message = JSON.stringify(message);
      this.getRealTime();
    });
  }

  eventTypeAnalysis() {
    this._ChartsService.getEventTypeAnalysis().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.detectionDetails = response.data.map((item: any) => ({
            name: item._id,
            value: item.count,
          }));
        }
      },
      error: (err) => {
        console.error('Error fetching chart data:', err);
      },
    });
  }

  getFreqLocations() {
    this._ChartsService.getTopFiveFreqLocations().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.topFreqLocation = response.data.locations.map(
            (location: any, index: any) => ({
              name: `Location ${index + 1} (${location.avgLatitude.toFixed(
                2
              )}, ${location.avgLongitude.toFixed(2)})`,
              value: location.count,
            })
          );
        }
      },
    });
  }

  robotBehaviorRanks() {
    this._ChartsService.getRobotBehaviorRanks().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.robotRanks = response.data.robotBehavior.map((item: any) => ({
            name: `Robot ${item._id}`,
            value: item.count,
          }));
        }
      },
    });
  }

  getRealTime() {
    this.eventTypeAnalysis();
    this.getFreqLocations();
    this.robotBehaviorRanks();
  }
}
