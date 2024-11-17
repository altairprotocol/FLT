import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { ExchangeProvider } from '../codono.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-withdrawal-info',
  templateUrl: './withdrawal-info.page.html',
  styleUrls: ['./withdrawal-info.page.scss'],
})
export class WithdrawalInfoPage implements OnInit {

  withdrawal: any;

  constructor(
    private clipboard: Clipboard,
    private route: ActivatedRoute,
    public exchangeProvider: ExchangeProvider,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.withdrawal = params;
      console.log(this.withdrawal)
    });
  }

  back() {
    this.location.back();
  }

  copyString(data) {
    this.clipboard.copy(data);
    if (data) {
      const msg = 'Copied';
      this.exchangeProvider.presentToast(msg);
    }
    console.log(this.clipboard);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
