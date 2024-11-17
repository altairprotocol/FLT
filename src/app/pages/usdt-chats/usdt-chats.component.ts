import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent  implements OnInit {
  rank: any = [
    { r: 'Ranking', n: '#1' },
    { r: 'Market Cap', n: '#1.02T' },
    { r: 'Max Supply', n: '21M' },
    { r: 'Circulating Supply', n: '19.63M' },
    { r: 'All-Time_High', n: '$68,789.62' },
  ]
  showChart: boolean = true;
  showCoinInfo: boolean = false;
  constructor() { }

  ngOnInit() {
    console.log('component loaded');
  }

  toggleSection(section: string) {
    if (section === 'chart') {
      this.showChart = true;
      this.showCoinInfo = false;
    } else if (section === 'coin-info') {
      this.showChart = false;
      this.showCoinInfo = true;
    }
  }
}
