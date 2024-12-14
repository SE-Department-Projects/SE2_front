import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.css'],
})
export class HorizontalBarChartComponent {
  @Input() freqLocationsData: any[] = [];
  // data: any[] = [
  //   {
  //     count: 2,
  //     avgLatitude: 30.10179057703485,
  //     avgLongitude: 31.098153887253716,
  //   },
  //   {
  //     count: 1,
  //     avgLatitude: 29.964248354424264,
  //     avgLongitude: 30.9690964352527,
  //   },
  //   {
  //     count: 3,
  //     avgLatitude: 29.964248354424264,
  //     avgLongitude: 30.9690964352527,
  //   },
  //   {
  //     count: 5,
  //     avgLatitude: 29.964248354424264,
  //     avgLongitude: 30.9690964352527,
  //   },
  //   {
  //     count: 4,
  //     avgLatitude: 29.964248354424264,
  //     avgLongitude: 30.9690964352527,
  //   },
  // ];

  view: [number, number] = [700, 400];
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  barPadding: number = 50;
  xAxisLabel: string = 'Count';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Location';
  customColors: any[] = [
    { name: 'Location 1', value: '#5AA454' },
    { name: 'Location 2', value: '#E44D25' },
  ];

  ngOnInit(): void {}
}
