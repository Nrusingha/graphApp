import { Component, OnInit } from '@angular/core';
import { GraphchartService } from './graphchart.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-graph-chart',
  templateUrl: './graph-chart.component.html',
  styleUrls: ['./graph-chart.component.css'],
  providers: [DatePipe]
})

export class GraphChartComponent implements OnInit {

  barChartOptions: any = { scaleShowVerticalLines: false, responsive: true };
  barChartType: string = 'bar';
  barChartLegend: boolean = true;
  countries = [];
  selectedCounrty: any;
  active = [];
  confirmed = [];
  cdate = [];

  constructor(private chartServce: GraphchartService, private datePipe: DatePipe) {
    this.selectedCounrty = 'india';
  }

  ngOnInit() {
    this.chartServce.getCountries().subscribe(
      result => {
        result.forEach(element => {
            this.countries.push({ Slug: element.Slug, Country: element.Country });
        });
      }
    );
    this.mbarChartLabels = this.cdate;
    this.onChange();
  }

  onChange() {
    this.active = [];
    this.confirmed = [];
    this.chartServce.filterCountry(this.selectedCounrty)
      .subscribe(result => {
        result.forEach((element, i) => {
          if (i > 50 && i < 63) {
            this.active.push(element.Active);
            this.confirmed.push(element.Confirmed);
            this.cdate.push(this.datePipe.transform(element.Date, 'yyyy-MM-dd'));
          }
        });
        this.mbarChartLabels = this.cdate;
        this.barChartData = [
          { data: this.active, label: 'Active Cases' },
          { data: this.confirmed, label: 'Total Cases' }
        ]
        this.cdate = [];
      })
  }

  barChartColors: Array<any> = [
    {
      backgroundColor: 'rgb(255, 128, 0)',
      borderColor: 'rgba(105,159,177,1)',
      pointBackgroundColor: 'rgba(105,159,177,1)',
      pointBorderColor: '#fafafa',
      pointHoverBackgroundColor: '#fafafa',
      pointHoverBorderColor: 'rgba(105,159,177)'
    },
    {
      backgroundColor: 'rgb(0, 255, 128)',
      borderColor: 'rgba(77,20,96,1)',
      pointBackgroundColor: 'rgba(77,20,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,20,96,1)'
    }
  ];
  chartClicked(e: any): void {
    console.log(e);
  }
  chartHovered(e: any): void {
    console.log(e);
  }
  mbarChartLabels: string[] = ['2009', ' 2011', '2013', '2015', '2017', '2019', '2020'];
  barChartData: any[] = [
    { data: [40, 55, 85, 75, 12, 39, 27 ], label: 'Active Cases' },
    { data: [35, 22, 63, 56, 99, 78, 71], label: 'Total Cases' }
  ];
  randomize(): void {
    let data = [
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      Math.round(Math.random() * 100),
      (Math.random() * 100),
      Math.round(Math.random() * 100),
      (Math.random() * 100),
      Math.round(Math.random() * 100)];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
  }

}
