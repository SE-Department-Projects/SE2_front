import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RobotsService } from 'src/app/core/services/robots.service';

@Component({
  selector: 'app-robot-config',
  templateUrl: './robot-config.component.html',
  styleUrls: ['./robot-config.component.css'],
})
export class RobotConfigComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _RobotsService: RobotsService,
    private _Toastr: ToastrService
  ) {}

  robots: any[] = [];
  totalCount: Number = 0;

  ngOnInit(): void {
    this.getAllRobots();
  }

  tableColumns = [
    { field: 'id', header: 'ID' },
    { field: 'status', header: 'Status' },
    { field: 'batteryLevel', header: 'Battery Level' },
    { field: 'lastMaintenanceDate', header: 'Last Maintenance Date' },
  ];

  tableActions = [
    { lable: 'eye', icon: 'eye' },
    { icon: 'edit' },
    { icon: 'trash' },
  ];

  actionClick(event: { action: { label: string; icon: string }; row: any }) {}

  getAllRobots(): any {
    this._RobotsService.getAllRobots().subscribe({
      next: (response) => {
        if (response.status === 'success') {
          this.robots = response.data.robots;
          this.totalCount = response.results;
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
