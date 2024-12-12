import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RobotsService } from 'src/app/core/services/robots.service';

@Component({
  selector: 'app-robot-config',
  templateUrl: './robot-config.component.html',
  styleUrls: ['./robot-config.component.css'],
})
export class RobotConfigComponent {
  constructor(
    private _RobotsService: RobotsService,
    private _HttpClient: HttpClient,
    private router: Router
  ) {}

  robots: any[] = [];

  ngOnInit(): void {
    this.getAllRobots();
  }

  tableColumns = [
    { field: 'id', header: 'ID' },
    { field: 'location', header: 'Location' },
    { field: 'isMalfunctioned', header: 'Malfunctioned' },
  ];

  tableActions = [{ icon: 'eye' }, { icon: 'edit' }, { icon: 'trash' }];

  actionClick(event: { action: { label: string; icon: string }; row: any }) {
    console.log(event);
    const action = event.action;
    const row = event.row;
    switch (action.icon) {
      case 'eye':
        this.router.navigate(['/robotInfo', row.id]);
        break;
      case 'edit':
        // this.router.navigate(['/admin/editUser', row.id]);

        break;
      case 'trash':
        this.deleteRobot(row._id);
        break;
      default:
        console.log('Unknown action', action);
    }
  }

  getAllRobots(): any {
    this._RobotsService.getAllRobots().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.robots = response.data.robots;

          this.robots.forEach((robot) => {
            const { latitude, longitude } = robot.location;
            this.getLocationName(latitude, longitude).then((locationName) => {
              robot.location = locationName || `${latitude}, ${longitude}`;
            });
          });
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteRobot(id: number): void {
    this._RobotsService.deleteRobot(id).subscribe({
      next: (res) => {
        this.getAllRobots();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async getLocationName(lat: number, lon: number): Promise<string> {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`;
    try {
      const response: any = await this._HttpClient.get(url).toPromise();
      return response.display_name || 'Unknown location';
    } catch (err) {
      console.error('Error fetching location:', err);
      return 'Failed to fetch location';
    }
  }
}
