import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-otc-main',
  templateUrl: './otc-main.page.html',
  styleUrls: ['./otc-main.page.scss'],
})
export class OtcMainPage implements OnInit {
  useCoin: string = null
  useCoins: any = null
  useCoinAmount: any = null;
  useCoinImage: any = null

  getCoin: string = null
  getCoins: any = null
  getCoinAmount: any = null;
  getCoinImage: any = null

  validOptions: boolean = false



  constructor(private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.otcIndex()
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

  async otcIndex() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();

    this.exchangeProvider.otcindex().subscribe(
      (data) => {
        let res = JSON.parse(JSON.stringify(data));
        let response = res.data;
        alert.dismiss();
        this.useCoins = response.base_coins;
        this.getCoins = response.trade_coins;
        if (response.default_coin_trade) {
          this.useCoin = response.default_coin_base.symbol.toUpperCase();
          this.useCoinImage = response.default_coin_base.image
        }
        if (response.default_coin_base) {
          this.getCoin =
            response.default_coin_trade.symbol.toUpperCase();
          this.getCoinImage = response.default_coin_trade.image
        }
        console.log(this.getCoin, this.useCoin);

        if (res.status === 0) {
          // this.nav.navigateForward('/otc');
        }
      },
      (error) => {
        alert.dismiss();
      }
    );
  }

  async swap() {
    const base_coin = this.useCoin;
    const trade_coin = this.getCoin;
    const input2 = this.useCoinAmount;
    const input1 = this.getCoinAmount;
    const tradetype = 'buy'

    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.otcgetquote(trade_coin, base_coin, input1, input2, tradetype).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        await loader.dismiss()
        if (response?.status === 1) {
          this.exchangeProvider.presentToast(response?.msg)
          this.nav.navigateForward('otc-confirm', {
            queryParams: { base_coin, trade_coin, input2, input1, time_left: response?.data?.expire, id: response?.data?.qid },
          });
        } else {
          if (typeof response?.data === 'string') {
            this.exchangeProvider.presentToast(response?.data)
          }
        }
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )

  }

}
