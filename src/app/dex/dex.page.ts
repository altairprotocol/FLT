import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-dex',
  templateUrl: './dex.page.html',
  styleUrls: ['./dex.page.scss'],
})
export class DexPage implements OnInit {

  useCoin: string = 'USDT'
  useCoinAmount: number = 0;
  getCoin: string = 'ETH'
  getCoinAmount: number = 0;

  constructor(private location: Location, private nav: NavController) { }

  ngOnInit() {
  }

  refer(path: string) {
    this.nav.navigateForward(path)
  }

  back() {
    this.location.back()
  }

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        console.log('Alert confirmed');
      },
    },
  ];

  setResult(ev) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}
