import { Component } from '@angular/core';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css'],
})
export class ColumnChartComponent {
  robotBehaviorData: any[] = [
    {
      _id: '2',
      count: 3,
    },
    {
      _id: '1',
      count: 3,
    },
    {
      _id: '3',
      count: 2,
    },
  ];

  view: [number, number] = [400, 400]; // Chart size (width x height)
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Robot Behavior';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Count';
  barPadding: number = 105; // Adjust padding between bars

  ngOnInit(): void {
    // Transform raw data into chart-compatible format
    this.robotBehaviorData = this.robotBehaviorData.map((item: any) => ({
      name: `Behavior ${item._id}`, // Name labels for each bar
      value: item.count, // Count as the value
    }));
  }
}
