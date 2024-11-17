import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.page.html',
  styleUrls: ['./convert.page.scss'],
})
export class ConvertPage implements OnInit {


  activeBaseMarket: string = "USDT";
  type: string = "BUY";
  mainCoin: string = "BTC";
  amount: any = null
  convertIndexResponse: any;
  coinsList: { [key: string]: { balance: number } } = {};
  filteredCoinsList: { [key: string]: { balance: number } } = {};
  amountCorrect: boolean = false

  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private nav: NavController) { }

  ngOnInit() {
    this.convertIndex()
  }

  back() {
    this.location.back()
  }

  changeBuySell(type: string) {
    this.type = type;
  }

  changeActiveBaseMarket(baseMarket: string) {
    this.activeBaseMarket = baseMarket
  }

  async convertIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.convertIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any));
      const coins = response?.data?.CoinList || {};
      const filteredCoinsList: { [key: string]: { balance: number } } = {};
      console.log("🚀 ~ ConvertPage ~ this.exchangeProvider.convertIndex ~ response:", response)
      if (response?.status === 1) {
        Object.entries(coins).forEach(([key, value]) => {
          // Type assertion to tell TypeScript that `value` has the structure { balance: number }
          const coin = value as { balance: number };

          if (coin.balance > 0) {
            filteredCoinsList[key] = coin;
          }
        });

        this.filteredCoinsList = filteredCoinsList;
        this.coinsList = coins
      }
      await loader.dismiss()
    })
  }

  async convertDoTrade() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.convertDoTrade(this.mainCoin.toLowerCase(), this.activeBaseMarket.toLowerCase(), this.amount).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ GiftPage ~ this.exchangeProvider.TransferIndex ~ response:", response)
      if (response?.status === 0) {
        this.exchangeProvider.presentToast(response?.data)
      } else {
        this.exchangeProvider.presentToast(response?.data)
      }
      await loader.dismiss()
    })
  }

  amountCorrectCheck() {
    console.log(this.amount);

    let available = this.formatNumber(this.coinsList[this.mainCoin.toLowerCase()]?.balance);
    if (!available) {
      this.amountCorrect = false
      return
    }
    console.log("🚀 ~ ConvertPage ~ amountCorrectCheck ~ available:", available)
    if (this.amount == undefined || this.amount == null || this.amount === 0) {
      this.amountCorrect = false
      return
    }
    if (available <= this.amount) {
      this.amountCorrect = false
    } else {
      this.amountCorrect = true
    }
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }

  referToTransfer() {
    this.nav.navigateForward("wallet-transfer")
  }

}
