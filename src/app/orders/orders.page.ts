import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  activeSegment: any = 'openOrders';
  data: any;
  commonmarket: any = 'btc_usdt';
  closedorders: any;
  buyorders: any;
  sellorders: any;
  entrusts: any;
  usercoins: any;
  available_two: any;
  available_one: any;
  sortBuySell: Number = 3;
  timer: any;
  filterSelect: any;

  constructor(public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public nav: NavController,
    public exchangeProvider: ExchangeProvider,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.entrustfun();
    this.myclosedorders(this.commonmarket);
  }

  back() {
    this.location.back()
  }

  segmentChanged(ev: any) {
    this.activeSegment = ev.detail.value;
  }


  async entrustfun() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();
    let market = 0;

    this.exchangeProvider.myopenorders(market).subscribe(
      (data) => {
        let myinfo = JSON.parse(JSON.stringify(data as any[]));
        alert.dismiss();
        if (myinfo) {
          this.entrusts = myinfo.data.entrust;
          this.usercoins = myinfo.data.usercoin;
          this.available_two = this.usercoins.usd;
          this.available_one = this.usercoins.xnb;
        }
      },
      (error) => { }
    );
  }

  async myclosedorders(market: string) {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();
    this.exchangeProvider.myclosedorders(market).subscribe(
      (data) => {
        let myinfo = JSON.parse(JSON.stringify(data as any[]));
        if (data && myinfo.data && myinfo.data.entrust) {
          this.closedorders = myinfo.data.entrust;
        }

        alert.dismiss();

      },
      (error) => { }
    );
  }

  async cancelentrust(id: number) {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();
    this.exchangeProvider.cancelentrust(id).subscribe(
      (data) => {
        let myinfo = JSON.parse(JSON.stringify(data as any[]));
        this.exchangeProvider.presentToast(myinfo.data);
        alert.dismiss();
        this.entrustfun();
      },
      (error) => {
        alert
          .dismiss()
          .then()
          .catch((iError) => { });
      }
    );
  }

  doRefresh(event) {
    this.entrustfun();
    this.myclosedorders(this.commonmarket);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
