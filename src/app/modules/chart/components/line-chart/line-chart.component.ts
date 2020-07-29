import {
  AfterViewInit,
  Component,
  ElementRef, Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import Chart from 'chart.js';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, AfterViewInit {
  @Input() xAxis: number[] | string[];
  @Input() yAxis: number[] | string[];
  @ViewChild('chartArea', {static: true}) chartArea: ElementRef;
  chart: any;

  constructor(@Inject(PLATFORM_ID) private platformId: string) {
  }

  ngOnInit(): void {
    this.initChart();
  }

  ngAfterViewInit(): void {
    // this.initChart();
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      this.chart = new Chart(this.chartArea.nativeElement, {
        type: 'line',
        data: {
          labels: this.xAxis,
          datasets: [{
            label: '# of Votes',
            data: this.yAxis,
            backgroundColor: [
              'rgba(255,255,255,0.2)'
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }

  }

  update() {
    if (isPlatformBrowser(this.platformId)) {
      this.chart.update();
    }
  }

}
