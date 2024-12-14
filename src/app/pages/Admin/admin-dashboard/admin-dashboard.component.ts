import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'src/app/core/services/charts.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  detectionDetails: any[] = [];
  topFreqLocation: any[] = [];

  constructor(private _ChartsService: ChartsService) {}

  ngOnInit(): void {
    this.eventTypeAnalysis();
    this.getFreqLocations();
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
          console.log(this.topFreqLocation);
        }
      },
    });
  }
}
