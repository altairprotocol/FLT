import { Component, OnInit, ViewChild } from '@angular/core';
import { IonItemSliding, LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../websocket.service';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.page.html',
  styleUrls: ['./trade.page.scss'],
})
export class TradePage implements OnInit {
  @ViewChild(IonItemSliding) slidingItem: IonItemSliding;
  selectedOption: string = 'buy';
  trade_type = 'limit';
  stop: any = 0;
  is_fav: boolean = false;
  fee_sell: any = 0.01;
  qty: any;
  commonmarket = 'btc_usdt';
  numberOfOrders = 5;
  printable_market: any;
  first: any;
  base: any;
  type: any = 1;
  activeSegment: string;
  marketInfo: any;
  max_price: any;
  changeRate: any;
  change: any;
  buyorders: any;
  sellorders: any;
  buyorders6: any;
  sellorders6: any;
  bestSellPrice: number;
  bestBuyPrice: number;
  entrusts: any;
  usercoins: any;
  available_two: any;
  available_one: any;
  tradeData = { price: '', qty: '', total: '', stop: '' };
  optionData = { buy: '', sell: '' };
  volume: any;
  buy_price: any;
  new_price: any;
  totalValue: number;
  sellPercentages: number[] = [];
  buyPercentages: number[] = [];
  price: any;
  total: number;
  showOpenOrders: boolean = true;
  showOrderHistory: boolean = false;
  closedorders: any;

  private wsSubscription: Subscription;
  private wsUrl: string = environment.wsUrl;
  private wsPair: string = 'btcusdt';
  showSliderHelperArrow: boolean = true;

  constructor(
    private location: Location,
    private webSocketService: WebSocketService,
    public menuCtrl: MenuController,
    public nav: NavController,
    public exchangeProvider: ExchangeProvider,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) { }

  selectOption(option: string) {
    this.selectedOption = option;
  }

  ngOnInit() {
    console.log('trade page loaded');
    this.route.queryParams.subscribe((params) => {
      if (params.market) {
        this.commonmarket = params.market;
        this.wsPair = this.commonmarket.replace('_', '')
      }
      if (params.type) {
        this.type = params.type;
        console.log(81, typeof this.type, this.type);
        if (this.type === 2) {
          this.selectedOption = 'sell'
        } else {
          this.selectedOption = 'buy'
        }


      }

      this.printable_market = this.commonmarket
        .replace('_', ' / ')
        .toUpperCase();
      this.first = this.commonmarket.split('_')[0].toUpperCase();
      this.base = this.commonmarket.split('_')[1].toUpperCase();
      if (this.type == 1) {
        this.activeSegment = 'Buy';
      } else {
        this.activeSegment = 'Sell';
      }
    });
    this.singlemarketinfo();
    this.activeorders();
    this.refresh();
  }

  setupWebSockets() {
    this.webSocketService.connect(this.wsUrl);
    console.log(this.wsPair, 109);

    this.wsSubscription = this.webSocketService.getFilteredMessages([this.wsPair], 'depth').subscribe((message: any) => {
      this.updateWsData(message);
    });

    this.wsSubscription = this.webSocketService.getFilteredMessages([this.wsPair], 'newprice').subscribe((message: any) => {
      if (typeof message.change === 'number') {

      this.change = message.change;
      }
    });
  }

  updateWsData(message: any) {
    if (message.type === 'depth' && message.market === this.wsPair) {
      this.buyorders = message.buy.map(order => ({
        price: order[0],
        nums: order[1]
      })).slice(0, this.numberOfOrders);

      this.sellorders = message.sell.map(order => ({
        price: order[0],
        nums: order[1]
      })).slice(-this.numberOfOrders);
      // .slice(0, this.numberOfOrders)

      this.calculatePercentages('buy');
      this.calculatePercentages('sell');
    }
  }


  refresh() {
    this.entrustfun(this.commonmarket)
    this.myclosedorders(this.commonmarket);
  }

  singlemarketinfo(market = this.commonmarket) {
    this.exchangeProvider.singlemarketinfo(market).subscribe(
      (data) => {
        const myinfo = JSON.parse(JSON.stringify(data as any[]));
        this.marketInfo = myinfo.data;
        this.max_price = this.marketInfo.max_price;
        this.changeRate = this.marketInfo.change.substr(0, 1);
        if (typeof this.marketInfo.change === 'number') {

        this.change = this.marketInfo.change;
        }
        this.volume = this.marketInfo.volume;
        console.log("I ran", this.volume);
        if (this.volume && typeof this.volume == 'number') {
          this.volume = this.volume.toFixed(2)
        }
        this.buy_price = this.marketInfo.buy_price;
        this.new_price = this.marketInfo.new_price;
        this.fee_sell = this.marketInfo.fee_sell;
      },
      (error) => { }
    );
  }

  activeorders(x: string = this.commonmarket) {
    this.exchangeProvider.activeorders(x).subscribe(
      (data) => {
        let myinfo = JSON.parse(JSON.stringify(data as any[]));
        if (myinfo && myinfo.data && myinfo.data.depth) {
          this.buyorders = myinfo.data.depth.buy.reverse();
          this.sellorders = myinfo.data.depth.sell.reverse();
          this.calculatePercentages('buy');
          this.calculatePercentages('sell');
          this.buyorders6 = myinfo.data.depth.buy
            .reverse()
            .slice(0, this.numberOfOrders);
          this.sellorders6 = myinfo.data.depth.sell.slice(
            0,
            this.numberOfOrders
          );
          this.bestSellPrice = myinfo.data.depth.buy.slice(0, 1)[0].price * 1;
          this.bestBuyPrice = myinfo.data.depth.sell.slice(0, 1)[0].price * 1;
          this.showPrice();
          this.setupWebSockets();
          // console.log(this.bestSellPrice);
          // console.log(this.bestBuyPrice);
        }
      },
      (error) => { }
    );
  }
  // numberOfOrders(arg0: number, numberOfOrders: any): any {
  //   throw new Error('Method not implemented.');
  // }
  // showPrice() {
  //   throw new Error('Method not implemented.');
  // }
  entrustfun(market: string) {
    this.exchangeProvider.myopenorders(market).subscribe(
      (data: any) => {
        if (data?.status == 1) {
          let myinfo = JSON.parse(JSON.stringify(data as any[]));
          if (myinfo) {
            this.entrusts = myinfo.data.entrust;
            this.usercoins = myinfo.data.usercoin;
            this.available_two = this.usercoins.usd;
            this.available_one = this.usercoins.xnb;
          }
        }
      },
      (error) => { }
    );
  }

  async myclosedorders(market: string) {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    // alert.present();
    this.exchangeProvider.myclosedorders(market).subscribe(
      (data) => {
        let myinfo = JSON.parse(JSON.stringify(data as any[]));
        if (data && myinfo.data && myinfo.data.entrust) {

          this.closedorders = myinfo?.data?.entrust?.filter((order) => {
            return order.first == this.first.toLowerCase() && order.base == this.base.toLowerCase()
          });

          console.log(this.closedorders, 228);

        }

        // alert.dismiss();

      },
      (error) => { }
    );
  }
  async changeFav(market, action) {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    await alert.present();
    this.exchangeProvider.changeFav(market, action).subscribe(
      (data) => {
        let myinfo = JSON.parse(JSON.stringify(data as any[]));
        console.log(myinfo);
        alert.dismiss();
        if (myinfo) {
          this.is_fav = myinfo.is_fav;
        }
      },
      (error) => { }
    );
  }
  calculatePercentages(type: string) {
    if (type === 'buy') {
      this.totalValue = this.buyorders.reduce((acc, order) => acc + parseFloat(order.price), 0);
      let cumulativeSum = 0;

      this.buyorders.forEach(order => {
        cumulativeSum += parseFloat(order.price);
        const percentage = (cumulativeSum / this.totalValue) * 100;
        this.buyPercentages.push(percentage);
      });
    } else {
      this.totalValue = this.sellorders.reduce((acc, order) => acc + parseFloat(order.price), 0);
      let cumulativeSum = 0;

      this.sellorders.forEach(order => {
        cumulativeSum += parseFloat(order.price);
        const percentage = (cumulativeSum / this.totalValue) * 100;
        this.sellPercentages.push(percentage);

      });
      this.sellPercentages.reverse()
    }
  }

  showPrice() {
    if (this.activeSegment === 'Buy') {
      const decimal = this.calcDecimal(this.bestBuyPrice);
      this.price = this.bestBuyPrice.toFixed(decimal);
      // console.log(this.price);
    } else {
      const decimal = this.calcDecimal(this.bestSellPrice);
      this.price = this.bestSellPrice.toFixed(decimal);
      // console.log(this.price);
    }
  }
  limitDecimals(price){
    let decimal=this.calcDecimal(price);
    return price.toFixed(decimal)*1;
  }
  calcDecimal(price) {
    let decimal = 2;
    if (price < 1) {
      decimal = 8;
    } else if (price > 1 && price < 10) {
      decimal = 6;
    } else if (price > 10) {
      decimal = 4;
    }

    return decimal;
  }

  async uptrade(type) {
    if (this.trade_type === 'market') {
      this.price = 0.01;
    }
    if (this.price && this.qty && this.commonmarket) {
      const alert = await this.loadingCtrl.create({
        message: 'Loading...',
      });
      alert.present();
      this.exchangeProvider
        .upTradeV2(
          this.price,
          this.qty,
          this.commonmarket,
          type,
          this.stop,
          this.trade_type
        )
        .subscribe(
          (data) => {
            this.clearInput()
            alert.dismiss();
            const myinfo = JSON.parse(JSON.stringify(data as any[]));
            this.exchangeProvider.presentToast(myinfo.data);
            this.refresh();
          },
          (error) => {
            alert
              .dismiss()
              .then()
              .catch((iError) => { });
          }
        );
    } else {
      const msg = 'Please fill required fields';
      this.exchangeProvider.presentToast(msg);
    }
  }

  cal_total() {
    if (this.price === 0 || this.qty === 0) {
      this.total = 0;
    } else {
      this.total = this?.price * this?.qty;
      if (isNaN(this.total)) {
        this.total = 0;
      }
    }
  }

  trade(percent) {
    if (!this.price || this.price === 0) {
      const msg = 'Please enter price first';
      this.exchangeProvider.presentToast(msg);
      return false;
    }
    console.log(333, this.type);
    if (this.type === 1) {
      if (percent > 90) {
        percent = percent - this.fee_sell;
      }
      this.total = (this.available_two * percent) / 100;
    } else {

      this.total = (this.available_one * percent) / 100;
    }
    this.qty = this.total / this.price;

    console.log(this.qty, 269);

  }

  toggleSection(section: string) {
    if (section === 'openOrders') {
      this.showOpenOrders = true;
      this.showOrderHistory = false;
    } else if (section === 'orderHistory') {
      this.showOpenOrders = false;
      this.showOrderHistory = true;
    }
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
        this.refresh();
      },
      (error) => {
        alert
          .dismiss()
          .then()
          .catch((iError) => { });
      }
    );
  }

  referToMarketDetail() {
    this.nav.navigateRoot('pages/market-detail', {
      queryParams: { market: this.commonmarket },
    });
  }

  referToMarkets() {
    this.nav.navigateRoot('tabs/markets');
  }
  referToDepositModel(index: number) {
    this.nav.navigateRoot('deposit-model', {
      queryParams: { coin: this.commonmarket.split("_")[index], type: 'crypto', action: 1 },
    });
  }

  doRefresh(event) {
    this.singlemarketinfo();
    this.activeorders();
    this.refresh();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  showComingSoon() {
    this.exchangeProvider.presentToast("Coming soon!")
  }

  async onSlideStart(item) {
    // let openWidth = await this.slidingItem.getOpenAmount()

    // if (openWidth == 0) {
    //   this.showSliderHelperArrow = true;
    // } else {
    //   this.showSliderHelperArrow = false;
    // }
  }

  async toggleSlide() {
    let openWidth = await this.slidingItem.getOpenAmount()
    if (openWidth == 0) {
      this.slidingItem.open('end');
      this.showSliderHelperArrow = false;
    } else {
      this.slidingItem.close()
      this.showSliderHelperArrow = true;
    }
  }

  refer(path: string) {
    this.nav.navigateForward(path)
  }

  clearInput() {
    this.buy_price = ''
    this.qty = ''
    this.total = null
  }

  back() {
    this.location.back();
  }

}
