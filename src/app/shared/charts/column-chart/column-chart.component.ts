import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.css'],
})
export class ColumnChartComponent {
  @Input() robotBehaviorData: any[] = [];

  view: [number, number] = [400, 400];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Robot ID';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Count';
  barPadding: number = 50;

  chartTitle: string = 'Robot Behavior Ranks';

  ngOnInit(): void {}
}
