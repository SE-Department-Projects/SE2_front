import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent {
  detectionDetails: any[] = [];

  // Define a color scheme for the chart
  customColors = [
    {
      name: 'Human Detection',
      value: '#01fc8d',
    },
    {
      name: 'Obstacle Detection',
      value: '#F44336',
    },
  ];

  ngOnInit(): void {
    this.detectionDetails = [
      {
        name: 'Human Detection',
        value: 70,
      },
      {
        name: 'Obstacle Detection',
        value: 30,
      },
    ];
  }

  view: [number, number] = [550, 370];
  showLegend: boolean = false;
  showLabels: boolean = true;
  gradient: boolean = false;
  isDoughnut: boolean = true;
  legendPosition: string = 'below';

  chartTitle: string = 'Detection Results';

  constructor() {}
}
