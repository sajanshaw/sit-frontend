import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis?: any;
  labels?: any;
  title?: any;
};

@Component({
  selector: 'app-default',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  // Summary Card Data
  ordersCount = 128;
  activeTrucks = 7;
  totalExpenses = 23500;

  // Orders Trend Chart Data
  ordersChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Orders',
        data: [10, 15, 12, 18, 22, 19, 25]
      }
    ],
    chart: {
      type: 'line',
      height: 280
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    title: {
      text: 'Orders (This Week)',
      align: 'left'
    }
  };

  // Expenses Breakdown Chart Data
  expensesChart: Partial<ChartOptions> = {
    series: [44, 55, 13, 43, 22],
    chart: {
      type: 'donut',
      height: 280
    },
    labels: ['Fuel', 'Maintenance', 'Tolls', 'Wages', 'Other'],
    title: {
      text: 'Expenses Breakdown',
      align: 'left'
    }
  };
}
