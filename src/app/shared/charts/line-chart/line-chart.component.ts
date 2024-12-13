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
      name: 'laptop',
      series: [
        {
          name: 'January',
          value: 178,
        },
        {
          name: 'February',
          value: 165,
        },
        {
          name: 'March',
          value: 144,
        },
      ],
    },
    {
      name: 'monitor',
      series: [
        {
          name: 'January',
          value: 144,
        },
        {
          name: 'February',
          value: 250,
        },
        {
          name: 'March',
          value: 133,
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
  xAxisLabel: string = 'Products';
  yAxisLabel: string = 'Sales';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#704FC4', '#4B852C'],
  };

  ngOnInit(): void {}
}
