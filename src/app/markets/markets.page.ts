import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { LoadingController, NavController } from '@ionic/angular';
import { WebSocketService } from '../websocket.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.page.html',
  styleUrls: ['./markets.page.scss'],
})
export class MarketsPage implements OnInit {
  isAuthenticated: boolean = false;
  activeSegment: string = 'USDT';
  homeData: any;
  mainData: any;
  storeUSDTData: any;
  darkMode: boolean = false;
  userEmail: any;
  hideKycBox: boolean = true;
  fullName: any;
  userName: any;
  private wsSubscription: Subscription;
  private wsUrl: string = environment.wsUrl;
  private wsPairs: string[] = [];

  constructor(private webSocketService: WebSocketService, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private nav: NavController) { }

  refer(path: string) {
    this.nav.navigateForward(path);
  }

  getTheme() {
    let darkMode = localStorage.getItem("darkMode");
    if (darkMode && darkMode == "true") {
      this.darkMode = true
    } else {
      this.darkMode = false
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

  async ngOnInit() {
    console.log('market page loaded');
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await alert.present();
    this.getDataWithBase();

    this.exchangeProvider.exchange_userinfo().subscribe((res: any) => {
      if (res?.status === 1) {
        this.isAuthenticated = true;
        this.hideKycBox = res?.data?.baseinfo?.kyc === "0" || res?.data?.baseinfo?.kyc === "3" ? false : true;
        console.log(this.hideKycBox);

      } else if (res?.status == -99) {
        this.hideKycBox = true
        this.isAuthenticated = false
        console.log(this.hideKycBox);
      }
    });
    await alert.dismiss()
  }

  async getDataWithBase(base = 'USDT') {
    this.exchangeProvider.marketswithbase(base).subscribe(
      (data) => {
        const myinfo = JSON.parse(JSON.stringify(data as any));
        const mydata = myinfo.data;
        if (base === 'USDT') {
          this.storeUSDTData = mydata.market;
        }
        this.homeData = mydata.market

        // WS logic

        this.wsPairs = this.homeData.filter(coin => coin.is_ws).map(coin => coin.ws_pair);

        console.log(this.wsPairs, 88);


        // Connect to WebSocket and subscribe to messages for each coin with is_ws set to true
        if (this.wsPairs.length > 0) {
          this.webSocketService.connect(this.wsUrl);
          this.wsSubscription = this.webSocketService.getFilteredMessages(this.wsPairs).subscribe((message: any) => {
            this.updateWsData(message);
          });
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  async segmentChanged(currentSegment: any) {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    this.activeSegment = currentSegment;
    if (this.activeSegment === 'USDT') {
      await alert.present();
      this.homeData = this.storeUSDTData;
      await alert.dismiss();
    }
    if (this.activeSegment === 'ETH') {
      await alert.present();
      this.getDataWithBase('ETH')
      await alert.dismiss();
    }
    if (this.activeSegment === 'BTC') {
      await alert.present();
      this.getDataWithBase('BTC')
      await alert.dismiss();
    }
  }

  logout() {
    localStorage.clear();
    this.nav.navigateRoot('login2');
  }

  referToMarketDetail(commonmarket: string) {
    this.nav.navigateRoot('pages/market-detail', {
      queryParams: { market: commonmarket },
    });
  }

  updateWsData(message: any) {
    const index = this.homeData.findIndex(item => item.ws_pair === message.market);
    if (index !== -1) {
      this.homeData[index].new_price = message.buy_price; // Update price based on WS message
      this.homeData[index].change = ((message.buy_price - this.homeData[index].min_price) / this.homeData[index].min_price) * 100; // Update change as needed
    }
  }

  doRefresh(event) {
    this.getDataWithBase();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
