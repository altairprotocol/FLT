import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fiat-deposit',
  templateUrl: './fiat-deposit.page.html',
  styleUrls: ['./fiat-deposit.page.scss'],
})
export class FiatDepositPage implements OnInit {
  public coin_data: any;
  public coin_name: string;
  public coin_symbol: string;
  public coin_total = 0.0;
  segment = 'balance';
  message: string;
  status: boolean;
  totalBTC = 0.0;
  totalUSD = 0.0;
  minAmount = 0.0;
  maxAmount = 0.0;
  info: any;
  selected_coin = 'try';
  passwordType = 'password';
  passwordIcon = 'eye-off';
  gateways: any;
  balance: any;
  list: any;
  coinname: any;
  coin_img: any;
  exchangeCoin: { name: 'btc'; total: 10; symbol: 'btc' };
  qrCode = '';
  // modal: Modal;
  receiveAmount: any = 0;
  loading: any;
  selected_gateway: any = 'x';
  selected_gateway_img: any;
  response: any;
  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private route: ActivatedRoute, private navCtrl: NavController) {

    this.route.queryParams.subscribe((params) => {
      this.selected_coin = params.coin;
    });
  }

  ngOnInit() {
    this.fiatDeposits();
  }

  back() {
    this.location.back();
  }

  async fiatDeposits() {
    console.log('ionViewDidLoad FiatDepositPage');

    let loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });



    this.exchangeProvider.fiatdeposits(this.selected_coin)
      .subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        this.coin_data = this.info.data;
        this.gateways = this.coin_data.gateways;
        this.selected_gateway = this.coin_data.gateways[0]?.name;
        this.selected_gateway_img = this.coin_data.gateways[0]?.img;
        console.log('selected gateway' + this.selected_gateway);
        this.coin_total = this.coin_data.balance;
        this.coin_symbol = this.coin_data.coinname;
        this.coin_img = this.coin_data.coin_img;
        this.list = this.coin_data.list;
        console.log(this.coin_total);
      }, error => {
        console.log(error);
        loading.dismiss()
          .then()
          .catch(iError => {
            console.log(iError);
          });
      });
  }

  fiatdeposit() {
    console.log('amount is:', this.receiveAmount);
    this.exchangeProvider.doFiatdeposit(this.selected_gateway, this.receiveAmount, this.selected_coin)
      .subscribe(data => {
        const receiveinfo = JSON.parse(JSON.stringify(data as any[]));
        this.response = receiveinfo.data;

        if (receiveinfo.status === 0) {
          this.exchangeProvider.presentToast(receiveinfo.data);
        } else {
          if (this.selected_gateway === 'yoco') {
            // this.navCtrl.navigateForward(YocoPage, {id: this.response.payinfo.id});
            console.log('Transferring to YocoPage');
          }
          else {
            this.navCtrl.navigateForward('/deposit-info', {
              queryParams: { id: this.response.payinfo.id, coin: this.selected_coin },
            });
          }
        }
      }, error => {
        console.log(error);
        this.loading.dismiss()
          .then()
          .catch(iError => {
            console.log(iError);
          });
      });
  }

  choosegateway(name) {
    this.selected_gateway = name;
  }

  doRefresh(event) {
    this.fiatDeposits();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
