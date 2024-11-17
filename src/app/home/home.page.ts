import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import * as _ from 'underscore';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { WebSocketService } from '../websocket.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  items: any[];
  info: any;
  mainData: any;
  homeData: any;
  topMoversData: any;
  topLoosersData: any;
  dataByID: any;
  dataByIDFirstFour: any;
  topLoodersFirstFour: any;
  topMoversFirstFour: any;
  activeSegment: string;
  isAuthenticated: boolean = false;
  userEmail: any;
  hideKycBox: boolean;
  fullName: any;
  userName: any;
  darkMode: boolean = false;
  data: any;
  banners: any;
  totalAssets: any;

  private wsSubscription: Subscription;
  public wsData: any[] = [];
  private wsPair: string = 'btcusdt';
  private wsUrl: string = environment.wsUrl
  private isWsAvailable: boolean = false;
  wsPairs: any;

  constructor(private webSocketService: WebSocketService, public exchangeProvider: ExchangeProvider, private nav: NavController, public location: Location, private toastController: ToastController, private barcodeScanner: BarcodeScanner, private toastCtrl: ToastController, private alertController: AlertController) {

    const numberOfElements = 5;


    this.items = Array(numberOfElements).fill({});
  }

  getTheme() {
    let darkMode = localStorage.getItem("darkMode");
    if (darkMode && darkMode == "true") {
      this.darkMode = true
    } else {
      this.darkMode = false
    }
  }

  ngOnDestroy() {
    if (this.wsSubscription) {
      this.wsSubscription.unsubscribe();
    }
  }

  changeToDarkMode(darkMode: boolean) {
    if (darkMode === true) {
      localStorage.setItem("darkMode", "true")
    } else {
      localStorage.setItem("darkMode", "false")
    }
    this.getTheme()
  }

  back() {
    this.location.back();
  }

  ngOnInit() {
    console.log('homepage loaded');
    this.getTheme();
    this.exchangeProvider.exchange_userinfo().subscribe((data: any) => {
      if (data?.status === 1) {
        this.isAuthenticated = true;
        this.userEmail = data?.data?.baseinfo?.email;
        this.hideKycBox = data?.data?.baseinfo?.kyc === "0" || data?.data?.baseinfo?.kyc === "3" ? false : true;
        this.fullName = data?.data?.baseinfo?.truename;
        this.userName = data?.data?.baseinfo?.username;
        this.totalAssets = data?.data?.coin?.usd?.zj;
      }
    });
    this.getBanners();
    this.marketData();
  }

  setUpWebSocket() {
    this.wsPairs = this.mainData.filter(coin => coin.is_ws).map(coin => coin.ws_pair);
    if (this.wsPairs.length > 0) {
      this.webSocketService.connect(this.wsUrl);
      this.wsSubscription = this.webSocketService.getFilteredMessages(this.wsPairs).subscribe((message: any) => {
        this.updateWsData(message);
      });
    }
  }

  referToMarketDetail(commonmarket: string) {
    this.nav.navigateRoot('pages/market-detail', {
      queryParams: { market: commonmarket },
    });
  }

  doRefresh(event) {
    this.getBanners()
    this.marketData();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  isLoggedIn() {

  }

  logout() {
    localStorage.clear();
    this.nav.navigateRoot('login2');
  }

  segmentChanged(ev: any = null) {
    if (ev) {
      this.activeSegment = ev.detail.value;
    }
    if (this.activeSegment === 'trending') {
      this.homeData = this.mainData
    }
    if (this.activeSegment === 'gainers') {
      this.homeData = this.mainData.sort((a, b) => b.change - a.change).filter(item => item.change > 0).slice(0, 4);
    }
    if (this.activeSegment === 'new') {
      this.homeData = this.mainData.sort((a, b) => parseInt(b.id, 10) - parseInt(a.id, 10)).slice(0, 4);
    }
    if (this.activeSegment === 'volume') {
      this.homeData = this.mainData.sort((a, b) => b.volume - a.volume).slice(0, 4);
    }
    if (this.activeSegment === 'losers') {
      this.homeData = this.mainData.sort((a, b) => a.change - b.change).filter(item => item.change < 0).slice(0, 4);
    }
  }

  getRandomItems(array: any[], num: number): any[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }

  marketData(baseName = 'usdt') {
    //filtermarket
    this.exchangeProvider
      .filtermarket('base', baseName.toLowerCase())
      .subscribe(
        (data) => {
          this.info = JSON.parse(JSON.stringify(data as any));
          this.mainData = this.info.data;
          this.homeData = this.getRandomItems(this.mainData.sort((a, b) => b.change - a.change), 4)
          this.topMoversData = _.sortBy(this.homeData, ['change']).reverse();
          this.topMoversFirstFour = _.first(this.topMoversData, [4]);
          this.dataByID = _.sortBy(this.homeData, ['id']);
          this.dataByIDFirstFour = _.first(this.dataByID, [4]);
          this.topLoosersData = _.sortBy(this.homeData, ['change']);
          this.topLoodersFirstFour = _.first(this.topLoosersData, [4]);
          this.setUpWebSocket()
        },
        (error) => { }
      );
  }

  refer(path: string) {
    this.nav.navigateForward(path);
  }


  async showComingSoon() {
    const toast = await this.toastController.create({
      message: 'Coming Soon!',
      duration: 700,
      position: 'middle'
    });
    toast.present();
  }

  scanQRCode() {
    this.barcodeScanner.scan().then(
      async (barcodeData) => {
        // Success! Barcode data is here
        let result: any = barcodeData.text;
        try {
          result = JSON.parse(barcodeData.text);
        } catch (error) {
          return false;
        }
        if (!result.desktop_ip && !result.qr_secure) {
          return false;
        }
        await this.presentAlert(result);
      },
      (err) => {
        // An error occurred
        console.log(JSON.stringify(err));
      }
    );
    // const qr_code='{"desktop_ip":"2401:4900:1c7a:5335:8580:9743:f984:3762","qr_secure":"15b0a28043ce4ec7840c57fdd90993e7"}';
    //this.presentAlert(JSON.parse(qr_code));
  }

  async presentAlert(result) {
    const alert = await this.alertController.create({
      header: `Are you sure? You want to login at ${result.desktop_ip}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { },
        },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: () => {
            this.exchangeProvider.desktop_login(result.desktop_ip, result.qr_secure).subscribe((data) => {
              this.data = JSON.parse(JSON.stringify(data as any));
              if (this.data.status === 1) {
                this.presentToast(this.data.data);
              } else {
                this.presentToast(this.data.data);
              }

            },
              (error) => {
                this.presentToast('Error');
              });
          }
          ,
        }
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
  }
  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4500
    });
    toast.present();
  }

  getBanners() {
    this.exchangeProvider.banners().subscribe((res: any) => {
      if (res?.status === 1) {
        this.banners = res?.data
      }
    })
  }

  updateWsData(message: any) {
    const index = this.homeData.findIndex(item => item.ws_pair === message.market);
    if (index !== -1) {
      this.homeData[index].new_price = message.buy_price;
      this.homeData[index].change = message.change
    }
    this.segmentChanged(null);
  }

}

