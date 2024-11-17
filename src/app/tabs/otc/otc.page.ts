import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { ExchangeProvider } from 'src/app/codono.service';

@Component({
  selector: 'app-otc',
  templateUrl: './otc.page.html',
  styleUrls: ['./otc.page.scss'],
})
export class OtcPage implements OnInit {
  selectedOption: string = 'buy';
  base_coin: any;
  trade_coin: any;
  otcinfo: any;
  base_coins: any;
  trade_coins: any;
  input1: any;
  input2: any;
  action: any;
  selectedImage: any;
  selectedBaseImage: any;
  tradetype: any = 'buy';
  requested: number;

  price = 0;
  qid: any = 0;
  qty: any = 0;
  expire = 0;
  total = 0;
  selection: any = 1;
  defaultCoin: string;
  compareWith: (o1: any, o2: any) => boolean;
  base: any;
  trade: any;
  constructor(public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public nav: NavController,
    public exchangeProvider: ExchangeProvider,
    private location: Location) { }

  ngOnInit() {
    this.getPagePrice()
  }

  selectOption(option: string) {
    this.selectedOption = option;
    console.log(this.selectedOption, 31);

  }

  async getPagePrice() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();

    this.exchangeProvider.otcindex().subscribe(
      (data) => {
        const myinfo = JSON.parse(JSON.stringify(data));
        this.otcinfo = myinfo.data;
        alert.dismiss();
        this.base_coins = this.otcinfo.base_coins;
        this.trade_coins = this.otcinfo.trade_coins;
        console.log(this.trade_coins);
        const theLength = this.trade_coin;
        // console.log(
        //   this.otcinfo.default_coin_base,
        //   this.otcinfo.default_coin_trade
        // );
        if (this.otcinfo.default_coin_trade) {
          this.trade_coin =
            this.otcinfo.default_coin_trade.symbol.toUpperCase();
          this.selectedImage = this.otcinfo.default_coin_trade.image
          console.log(this.trade_coin);
        }
        if (this.otcinfo.default_coin_base) {
          this.base_coin = this.otcinfo.default_coin_base.symbol.toUpperCase();
          this.selectedBaseImage = this.otcinfo.default_coin_base.image
        }
        if (myinfo.status === 0) {
          //   this.presentToast(myinfo.data);
          this.nav.navigateForward('/otc');
        } else {
          // this.presentToast(myinfo.data);
        }
      },
      (error) => {
        alert.dismiss();
      }
    );
  }

  fixdecimals(xselect) {
    if (xselect === 1) {
      this.input1 = this.input1 ? this.input1 : 0;
      this.input1 = parseFloat(this.input1).toFixed(8);
      this.input2 = '';
      this.action = this.input1 + ' ' + this.trade_coin.toUpperCase();
    } else {
      this.input2 = this.input2 ? this.input2 : 0;
      this.input1 = '';
      this.input2 = parseFloat(this.input2).toFixed(8);
      this.action = 'For ' + this.input2 + ' ' + this.base_coin.toUpperCase();
    }
    console.log(this.action);
  }

  findImage(type = "trade") {
    if (type == "trade") {
      const theLength = this.trade_coins.length;
      const selectedCoin = this.trade_coin.trim().toLowerCase();
      console.log(theLength, selectedCoin);
      for (let i = 0; i < theLength; i++) {
        const tcoin = this.trade_coins[i].symbol.toLowerCase();
        if (tcoin === selectedCoin) {
          this.selectedImage = this.trade_coins[i].image;
        }
      }
    } else {
      const theLength = this.base_coins.length;
      const selectedCoin = this.base_coin.trim().toLowerCase();
      console.log(theLength, selectedCoin);

      for (let i = 0; i < theLength; i++) {
        const tcoin = this.base_coins[i].symbol.toLowerCase();
        if (tcoin === selectedCoin) {
          this.selectedBaseImage = this.base_coins[i].image;
        }
      }
    }
  }

  back() {
    this.location.back()
  }

  async getquote(type) {
    console.log('GetQuote Methood');
    if (type === 1) {
      this.tradetype = 'buy';
    } else {
      this.tradetype = 'sell';
    }

    if (this.input1 || this.input2) {
      const alert = await this.loadingCtrl.create({
        message: 'Loading...',
      });
      alert.present();
      this.exchangeProvider
        .otcgetquote(
          this.trade_coin,
          this.base_coin,
          this.input1,
          this.input2,
          this.tradetype
        )
        .subscribe(
          (data) => {
            alert.dismiss();
            const myinfo = JSON.parse(JSON.stringify(data as any[]));
            if (myinfo.status === 0) {
              this.exchangeProvider.presentToast(myinfo.data);
            } else {
              //Quote is good and lets proceed

              this.requested = 2;
              console.log(myinfo.data);
              this.base = myinfo.data.base;
              this.trade = myinfo.data.trade;
              this.price = myinfo.data.price;
              this.qid = myinfo.data.qid;
              this.qty = myinfo.data.qty;
              this.expire = myinfo.data.expire;
              this.total = myinfo.data.total;
              this.exchangeProvider.presentToast(myinfo.msg);
              //let count_mili=parseInt(this.expire+"000");
              this.StartTimer(this.expire);
            }
          },
          (error) => {
            console.log(error);
            alert
              .dismiss()
              .then()
              .catch((error) => {
                console.log(error);
              });
          }
        );
    } else {
      const msg = 'Please fill all the fields.';
      this.exchangeProvider.presentToast(msg);
    }
  }

  StartTimer(maxtime) {
    if (maxtime <= 0) {
      return false;
    }
    setTimeout(() => {
      if (maxtime <= 0) {
      }
      maxtime = maxtime - 1;
      this.expire = maxtime;
      if (maxtime > 0) {
        //this.hidevalue = false;
        this.StartTimer(maxtime);
      } else {
        this.expire = 0;
        //this.hidevalue = true;
      }
    }, 1000);
  }

  refer(path) {
    this.nav.navigateForward(path);
  }

  async ConfirmQuote(qid) {
    console.log(qid + 'approved');
    //otcapprovequote

    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();
    this.exchangeProvider.otcapprovequote(this.qid).subscribe(
      (data) => {
        alert.dismiss();
        const myinfo = JSON.parse(JSON.stringify(data as any[]));
        if (myinfo.status === 0) {
          this.exchangeProvider.presentToast(myinfo.data);
        } else {
          //Quote approved and lets check its resp
          const recordid = myinfo.data;
          console.log(recordid);
          this.requested = 1;
          this.nav.navigateForward('/otclog', {
            queryParams: { qid: recordid },
          });
        }

        this.ngOnInit();
      },
      (error) => {
        console.log(error);
        alert
          .dismiss()
          .then()
          .catch((iError) => {
            console.log(iError);
          });
      }
    );
  }

  rejectQuote() {
    console.log('rejected');
    this.requested = 1;
  }

}
