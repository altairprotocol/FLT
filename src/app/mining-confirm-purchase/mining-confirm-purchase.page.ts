import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mining-confirm-purchase',
  templateUrl: './mining-confirm-purchase.page.html',
  styleUrls: ['./mining-confirm-purchase.page.scss'],
})
export class MiningConfirmPurchasePage implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

}
