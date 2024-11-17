import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { Location } from '@angular/common';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@Component({
  selector: 'app-withdrawal-detail',
  templateUrl: './withdrawal-detail.page.html',
  styleUrls: ['./withdrawal-detail.page.scss'],
})
export class WithdrawalDetailPage implements OnInit {

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
