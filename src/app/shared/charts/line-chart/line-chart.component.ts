import { Component } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent {
  constructor() {}

  productSalesMulti: any[] = [
    {
      name: 'Human Detection',
      series: [
        {
          name: '12 PM',
          value: 178,
        },
        {
          name: '6 PM',
          value: 165,
        },
        {
          name: '12 pm ',
          value: 144,
        },
        {
          name: '6 AM ',
          value: 144,
        },
      ],
    },
    {
      name: 'monitor',
      series: [
        {
          name: '12 PM',
          value: 70,
        },
        {
          name: '6 PM',
          value: 99,
        },
        {
          name: '12 pm ',
          value: 84,
        },
        {
          name: '6 AM ',
          value: 154,
        },
      ],
    },
  ];
  view: [number, number] = [550, 370];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Time';
  yAxisLabel: string = 'Detections';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#704FC4', '#4B852C'],
  };

  ngOnInit(): void {}
}
