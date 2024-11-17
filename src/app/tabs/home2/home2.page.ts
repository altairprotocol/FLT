import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ExchangeProvider } from 'src/app/codono.service';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { WebSocketService } from 'src/app/websocket.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.page.html',
  styleUrls: ['./home2.page.scss'],
})
export class Home2Page implements OnInit {
  mainData: any;
  homeData: any;
  activeBaseMarket: string = "USDT";
  banners: any;
  newsList: any;
  announcements:any;
  private wsSubscription: Subscription;
  public wsData: any[] = [];
  private wsUrl: string = environment.wsUrl
  wsPairs: any;
  @ViewChild(IonModal) modal: IonModal;
  constructor(private exchangeProvider: ExchangeProvider, private nav: NavController, private webSocketService: WebSocketService) { }

  ngOnInit() {
    this.getBanners();
    this.marketData()
    this.getNews()
    this.getAnnouncements();
  }

  marketData(baseName = 'usdt') {
    //filtermarket
    this.exchangeProvider
      .filtermarket('base', baseName.toLowerCase())
      .subscribe(
        (data) => {
          const info = JSON.parse(JSON.stringify(data as any));
          this.mainData = info.data;
          this.homeData = this.getRandomItems(this.mainData.sort((a, b) => b.change - a.change), 3)
          this.setUpWebSocket()
        })
  }

  getRandomItems(array: any[], num: number): any[] {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
  }
  getBanners() {
    this.exchangeProvider.appBanners().subscribe((res: any) => {
      if (res?.status === 1) {
        this.banners = res?.data
      }
    })
  }
  

  referToMarketDetail(commonmarket: string) {
    this.nav.navigateRoot('pages/market-detail', {
      queryParams: { market: commonmarket },
    });
  }

  refer(path: string) {
    this.modal.dismiss(null, 'cancel');
    this.nav.navigateForward(path);
  }

  changeActiveBaseMarket(baseMarket: string) {
    this.activeBaseMarket = baseMarket
    this.marketData(baseMarket.toLowerCase())
  }


  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      // this.message = `Hello, ${ev.detail.data}!`;
    }
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

  updateWsData(message: any) {
    const index = this.homeData.findIndex(item => item.ws_pair === message.market);
    if (index !== -1) {
      this.homeData[index].new_price = message.buy_price;
      this.homeData[index].change = message.change
    }
  }

  getNews() {
    this.exchangeProvider.news_list().subscribe((res: any) => {
      if (res?.status === 1) {
        this.newsList = res?.data
      }
    })
  }
  getAnnouncements() {
    this.exchangeProvider.annoucements().subscribe((res: any) => {
      if (res?.status === 1) {
        this.announcements = res?.data
      }
    })
  }
  referToArticleView(data: any) {
    
    this.nav.navigateForward('/article-view', {
      queryParams: { newsItem: JSON.stringify(data) },
    });
  }

}
