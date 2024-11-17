import { Location } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, MenuController, NavController, NavParams, ToastController } from '@ionic/angular';
import { ExchangeProvider } from 'src/app/codono.service';
import deptchChart from 'depth-chart-hb';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { WebSocketService } from 'src/app/websocket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-market-detail',
  templateUrl: './market-detail.component.html',
  styleUrls: ['./market-detail.component.scss'],
})
export class MarketDetailComponent implements OnInit {
  @ViewChild('canvasDiv') canvasDiv;
  @Input() id!: any;
  showChart: boolean = true;
  showCoinInfo: boolean = false;
  showMarketHistory: boolean = false;
  commonmarket: string = 'btc_usdt';
  url: string;
  urlSafe: SafeResourceUrl;
  printable_market: string = 'BTC / USDT';
  fee_buy: any;
  fee_sell: any;
  timer: any;
  trade_tabs: number = 1;
  tabs: any = 1;
  gaming: any = 'BTC';
  selection: any = 1;
  tradelogs: any;
  trad: any = 1;
  one: any = 'BTC';
  two: any = 'USDT';

  info: any;
  buyorders: any;
  sellorders: any;
  entrusts: any;
  closedorders: any;
  usercoins: any;
  first: string;
  base: string;
  price: any;
  qty: any;
  available: any;
  available_two: any;
  available_one: any;
  total_amount: any;
  showDepth: any;
  // showChart: any;
  public navParams = new NavParams();
  lineChart: Chart;
  data: any;
  selectedDes: any;
  selected: any;
  fillChart: any;
  @ViewChild('fillCanvas') fillCanvas;
  marketInfo: any;
  sentiment: any;
  max_price: any;
  change: any;
  volume: any;
  high: any;
  low: any;
  new_price: any;
  marketinfos: any;
  reserve: any;
  favTicker: any;
  favs: any;
  is_fav: boolean = false;
  processedBids: any;
  processedAsks: any[];
  processedAll: { bids: any; asks: any[]; version: number };
  counter: number = 0;
  chartUrl: string;
  goodChartUrl: any;

  img: any;
  additional: any;
  algorithm: any = null;
  block_reward: any = null;
  decimals: any = null;
  developer: any = null;
  difficulty: any = null;
  features: any = null;
  release_date: any = null;
  short_comings: any = null;
  supply: any = null;
  symbol: any = null;
  xnb: any;
  totalValue: number;
  sellPercentages: number[] = [];
  buyPercentages: number[] = [];
  coinTitle: any;

  private wsSubscription: Subscription;
  private wsUrl: string = environment.wsUrl;
  private wsPair: string = 'btcusdt';
  private numberOfOrders: number = 5;
  darkMode: boolean;

  constructor(
    private webSocketService: WebSocketService,
    private location: Location,
    private nav: NavController,
    public menuCtrl: MenuController,
    public exchangeProvider: ExchangeProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private route: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) { }

  getTheme() {
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode && darkMode === 'true') {
      this.darkMode = true;
      document.body.id = 'dark';
    } else {
      this.darkMode = false;
      document.body.id = '';
    }
  }

  ngOnInit() {
    console.log('component loaded');
    this.getTheme();

    this.route.queryParams.subscribe((params) => {
      console.log(params.market, 131);
      if (params?.market) {
        this.commonmarket = params.market;
      }
    });
    //@todo change light to theme scheme
    let theme = this.darkMode ? 'dark' : 'light'
    this.url =
      this.exchangeProvider.exchangeUrl +
      `/Trade/tv_mobile/skin/${theme}/market/` +
      this.commonmarket;
    this.selected = 'Order Book';
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    this.one=this.commonmarket.split('_')[0].toUpperCase();
    this.two=this.commonmarket.split('_')[1].toUpperCase();
    this.wsPair = this.commonmarket.replace("_", "");
    this.singlemarketinfo(this.commonmarket);
    this.activeorders(this.commonmarket);
    this.lasttrades(this.commonmarket);
    this.getFavMarkets();
  }

  getFavMarkets() {
    this.exchangeProvider.checkFavMarket(this.commonmarket).subscribe(
      (data) => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        if (this.info) {
          this.is_fav = this.info.is_fav;
        }
      },
      (error) => { }
    );
  }

  generateDepth() {
    this.processedBids = [];
    this.processedAsks = [];
    for (const value in this.buyorders) {
      if (this.buyorders.hasOwnProperty(value)) {
        const x = this.buyorders[value];
        this.processedBids.push([x.price, x.nums]);
      }
    }
    for (const value in this.sellorders) {
      if (this.sellorders.hasOwnProperty(value)) {
        const x = this.sellorders[value];
        this.processedAsks.push([x.price, x.nums]);
      }
    }
    this.processedAll = {
      bids: this.processedBids,
      asks: this.processedAsks,
      version: 123,
    };

    const data = {
      bids: this.processedBids,
      asks: this.processedAsks,
      version: 100570970085,
    };
    const jsonData = {
      priceFix: 2,
      amountFix: 4,
      lang: 'en-us',
      theme: 'hb-night',
      color: '#61688A',
      tipColor: '#CAD7E0',
      bgColor: 'rgba(0, 0, 0, 0.8)',
      bidsLineColor: 'rgba(65, 179, 125, 1)',
      asksLineColor: 'rgba(215, 78, 90, 1)',
      axisColor: 'rgba(97, 104, 138, .3)',
      langMap: {
        'en-us': { 委托价: 'Price', 累计: 'Total' },
      },
    };
    // this.canvasDiv.nativeElement.innerHTML = '';
    // let chart = new deptchChart(this.canvasDiv.nativeElement, jsonData);
    // chart.putData(this.processedAll);
  }

  activeorders(x: string) {
    this.counter = 0;
    this.exchangeProvider.activeorders(x).subscribe((data) => {
      let myinfo = JSON.parse(JSON.stringify(data as any[]));
      if (myinfo && myinfo.data && myinfo.data.depth) {
        this.buyorders = myinfo.data.depth.buy.reverse();
        this.sellorders = myinfo.data.depth.sell.reverse();
        this.sellorders = this.sellorders.reverse();
        this.calculatePercentages('buy');
        this.calculatePercentages('sell');
        this.generateDepth();
        this.setupDepthWS();
        // this.changeTabToLine();
      }
    });
  }

  setupDepthWS() {
    this.webSocketService.connect(this.wsUrl);

    console.log(this.wsPair, 233);


    this.wsSubscription = this.webSocketService.getFilteredMessages([this.wsPair], 'depth').subscribe((message: any) => {
      this.updateWsData(message, 'depth');
      if(message.change)
      this.change = message.change;
      if(this.change<0){
        this.sentiment='red';
      }else{
        this.sentiment='green';
      }
    });

    

    this.setupNewPriceWS()
  }

  setupNewPriceWS() {
    this.wsSubscription = this.webSocketService.getFilteredMessages([this.wsPair], 'newprice').subscribe((message: any) => {
      this.high = message.max_price
      this.low = message.min_price
      this.volume = this.formatLargeNumber(message.volume)
      if(message.change)
      this.change = message.change
    
      this.new_price = message.new_price
      if(this.change<0){
        this.sentiment='red';
      }else{
        this.sentiment='green';
      }
    });
  }
  formatLargeNumber(num: number): string {
    if (num >= 1_000_000_000) {
        return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (num >= 1_000_000) {
        return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1_000) {
        return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
        return num.toString();
    }
}

  setupTradeLogsWS() {
    this.wsSubscription = this.webSocketService.getFilteredMessages([this.wsPair], 'tradelog').subscribe((message: any) => {

      this.updateWsData(message, 'tradelog');
    });
  }

  updateWsData(message: any, currentCoin: string) {
    if (currentCoin == 'depth') {
      if (message.type === 'depth' && message.market === this.wsPair) {
        this.buyorders = message.buy.map(order => ({
          price: order[0],
          nums: order[1]
        })).reverse().slice(0, this.numberOfOrders);

        this.sellorders = message.sell.map(order => ({
          price: order[0],
          nums: order[1]
        })).reverse().slice(-this.numberOfOrders);
        // .slice(0, this.numberOfOrders)

        this.calculatePercentages('buy');
        this.calculatePercentages('sell');
      }
    } else if (currentCoin == 'tradelog') {
      if (message.type === 'tradelog' && message.market === this.wsPair) {

        const newTradeLog = {
          price: message.price,
          num: message.num,
          addtime: message.date,
          time: message.time,
          type: message.trade_type
        };

        // Add new trade log to the beginning of the array
        this.tradelogs.unshift(newTradeLog);

        // Ensure the length of the tradelogs array remains the same
        if (this.tradelogs.length > this.numberOfOrders) {
          this.tradelogs.pop();
        }
      }
    }
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
    }
  }

  singlemarketinfo(market) {
    this.exchangeProvider.singlemarketinfo(market).subscribe(
      (data) => {
        let myinfo = JSON.parse(JSON.stringify(data as any[]));
        this.marketInfo = myinfo.data;
        this.volume = this.formatLargeNumber(this.marketInfo.volume);
        this.new_price = this.marketInfo.new_price;
        this.high = this.marketInfo.max_price;
        this.low = this.marketInfo.min_price;
        this.max_price = this.marketInfo.max_price;
        this.change = this.marketInfo.change;
        if(this.change<0){
          this.sentiment='red';
        }else{
          this.sentiment='green';
        }
        this.img = this.marketInfo.icon;

        // Additional Segment

        this.additional = myinfo.data.additional;
        this.algorithm = this.additional?.algorithm;
        this.coinTitle = this.additional?.title;
        this.block_reward = this.additional?.block_reward;
        this.decimals = this.additional?.decimals;
        this.developer = this.additional?.developer;
        this.difficulty = this.additional?.difficulty;
        this.features = this.additional?.features;
        this.release_date = this.additional?.release_date;
        this.short_comings = this.additional?.short_comings;
        this.supply = this.additional?.supply;
        this.symbol = this.additional?.symbol;
        this.xnb = this.additional?.xnb;
      },
      (error) => { }
    );
  }

  lasttrades(market: string) {
    this.exchangeProvider.lasttrades(market).subscribe(
      (data) => {
        let myinfo = JSON.parse(JSON.stringify(data as any[]));
        if (myinfo && myinfo.data && myinfo.data.tradelog) {
          this.tradelogs = myinfo.data.tradelog;
          this.setupTradeLogsWS()
        }
      },
      (error) => { }
    );
  }

  back() {
    this.location.back();
  }

  toggleSection(section: string) {
    if (section === 'chart') {
      this.showChart = true;
      this.showMarketHistory = false;
      this.showCoinInfo = false;
    } else if (section === 'coin-info') {
      this.showChart = false;
      this.showCoinInfo = true;
      this.showMarketHistory = false;
    } else if (section === 'marketHistory') {
      this.showChart = false;
      this.showCoinInfo = false;
      this.showMarketHistory = true;
    }
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

  referToTrade(name, type) {
    this.nav.navigateForward('/tabs/trade', {
      queryParams: { market: name, type: type },
    });
  }

  doRefresh(event) {
    this.singlemarketinfo(this.commonmarket);
    this.activeorders(this.commonmarket);
    this.lasttrades(this.commonmarket);
    this.getFavMarkets();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}

