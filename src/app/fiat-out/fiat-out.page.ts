import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeProvider } from '../codono.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-fiat-out',
  templateUrl: './fiat-out.page.html',
  styleUrls: ['./fiat-out.page.scss'],
})
export class FiatOutPage implements OnInit {
  selectcoin: string;
  info: any;
  loading: any;
  addresses: any;
  sendaddress: any;
  coin_total: any;
  sendAmount: any;
  fundpassword: any;
  type: any;
  action: any;
  msg: any;
  coin_name: any;

  constructor(private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private route: ActivatedRoute, private navCtrl: NavController) {
    this.route.queryParams.subscribe((params) => {
      this.selectcoin = params.coin;
      this.type = params.type;
      this.action = params.action;
    });

  }

  ngOnInit() {
    this.initFiatOut()
  }

  async initFiatOut() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    console.log('ionViewDidLoad FiatOutPage');
    this.exchangeProvider.fiatout(this.selectcoin)
      .subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        alert.dismiss();
        this.addresses = this.info.data.userBankList;
        this.coin_total = this.info.data.fiat;
        this.coin_name = this.info.data.coin;
        //    console.log(this.addresses);
        //      console.log(this.info);
      }, error => {
        console.log(error);
        alert.dismiss()
          .then()
          .catch(iError => {
            console.log(iError);
          });
      });
  }

  back() {
    this.location.back();
  }

  async sendWithdrawal(selectcoin, sendAmount, fundpassword, sendaddress, coin_symbol) {

    const alert = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    alert.present();
    console.log('ionViewDidLoad FiatOutPage');
    this.exchangeProvider.dofiatout(sendAmount, fundpassword, sendaddress, selectcoin)
      .subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        alert.dismiss();
        // console.log(this.info)

        this.exchangeProvider.presentToast(this.info.data);
        if (this.info.status === 1) {
          this.navCtrl.navigateRoot('/fiat-history', {
            queryParams: { coin: this.selectcoin, type: this.type },
          });
          this.msg = this.info.msg;
          // {coin:this.selectcoin,segment:'history'}
        }
        else { this.initFiatOut(); }

      }, error => {
        console.log(error);
        alert.dismiss()
          .then()
          .catch(iError => {
            console.log(iError);
          });
      });

  }

  addbank() {
    this.navCtrl.navigateForward('addbank', {
      queryParams: { coin: this.selectcoin, type: this.type, action: this.action },
    });
  }

  doRefresh(event) {
    this.initFiatOut()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
