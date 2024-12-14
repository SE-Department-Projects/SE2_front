import { Component, Input } from '@angular/core';
import { ChartsService } from 'src/app/core/services/charts.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  @Input() detectionDetails: any[] = [];
  constructor(private _ChartsService: ChartsService) {}
  customColors = [
    // {
    //   name: 'Human Detection',
    //   value: '#01fc8d',
    // },
    // {
    //   name: 'Obstacle Detection',
    //   value: '#F44336',
    // },
  ];

  ngOnInit(): void {}

  view: [number, number] = [600, 370];
  showLegend: boolean = true;
  showLabels: boolean = true;
  gradient: boolean = false;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';

  chartTitle: string = 'Detection Results';
}
