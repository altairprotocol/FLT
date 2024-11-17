import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@Component({
  selector: 'app-deposit-info',
  templateUrl: './deposit-info.page.html',
  styleUrls: ['./deposit-info.page.scss'],
})
export class DepositInfoPage implements OnInit {
  id = 0;
  trid = 0;
  response: any;
  gateway: any;
  payinfo: any;
  title: any;
  bank: any;
  acnumber: any;
  name: any;
  remark: any;
  amount = 0.00;
  coin: any;
  memo: any;
  status: any;
  selectcoin: any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public exchangeProvider: ExchangeProvider, private toastCtrl: ToastController, private route: ActivatedRoute, private location: Location, private clipboard: Clipboard) {
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.trid = params.id;
      this.selectcoin = params.coin;
    });
  }

  ngOnInit() {
    this.initGetData()
  }

  async initGetData() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...'
    });

    this.exchangeProvider.fiatdepositinfo(this.trid)
      .subscribe(data => {
        const receiveinfo = JSON.parse(JSON.stringify(data as any[]));
        // console.log(84,receiveinfo);
        this.response = receiveinfo.data;
        this.gateway = this.response.gateway;
        this.payinfo = this.response.payinfo;
        this.title = this.gateway.title;
        this.bank = this.gateway.kaihu;
        this.acnumber = this.gateway.username;
        this.name = this.gateway.truename;
        this.remark = this.gateway.remark;
        this.amount = this.payinfo.num;
        this.coin = this.payinfo.coin;
        this.memo = this.payinfo.tradeno;
        this.status = this.payinfo.status;
        this.id = this.payinfo.id;
        console.log(this.acnumber);
      }, error => {
        console.log(error);
        alert.dismiss()
          .then()
          .catch(insideError => {
            console.log(insideError);
          });
      });
  }

  depositMore() {
    this.navCtrl.navigateForward('fiat-deposit', {
      queryParams: { coin: this.selectcoin, type: 'fiat', action: 1 },
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
    this.initGetData()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
