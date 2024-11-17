import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-p2p-buy-pay-done',
  templateUrl: './p2p-buy-pay-done.page.html',
  styleUrls: ['./p2p-buy-pay-done.page.scss'],
})
export class P2pBuyPayDonePage implements OnInit {

  constructor(private nav: NavController) { }

  ngOnInit() {
  }

  refer(path: string) {
    this.nav.navigateForward(path)
  }

}
