import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.page.html',
  styleUrls: ['./balance.page.scss'],
})
export class BalancePage implements OnInit {
  coin: any;
  type: any;
  balinfo: any;
  coin_total: any;
  available: any;
  inorder: any;
  coin_name: any;
  coin_img: any;
  coin_symbol: any;
  fiat: string;
  conversion_coin: any;
  fees_percent: any;
  fees_flat: any;
  homeData: any;

  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private route: ActivatedRoute, private loadingCtrl: LoadingController, private nav: NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.coin = params.coin;
      this.type = params.type;
    });
    this.getCoinData();
    this.balanceDetails();
  }

  getCoinData() {
    this.exchangeProvider.filtermarket('coin', this.coin.toLowerCase()).subscribe((res: any) => {
      if (res?.status === 1) {
        if (res?.data) {
          this.homeData = res?.data;
        }
      }
    })
  }

  async balanceDetails() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    alert.present();

    this.exchangeProvider.exchange_coinbalance(this.coin, 8).subscribe(
      (data) => {
        this.balinfo = JSON.parse(JSON.stringify(data as any[]));
        alert.dismiss();
        this.coin_total = this.balinfo.data.coinList?.total;
        this.available = this.balinfo.data.coinList?.xnb;
        this.inorder = this.balinfo.data.coinList?.xnbd;
        this.coin_name = this.balinfo.data.coinList?.name;
        this.coin_img = this.balinfo.data.coinList?.ico;
        this.coin_symbol = this.balinfo.data.coinList?.symbol;
        this.fiat = parseFloat(this.balinfo.data?.fiat).toFixed(2);
        this.conversion_coin = this.balinfo.data?.conversion_coin;
        this.fees_percent = this.balinfo.data.coinList?.fees_percent;
        this.fees_flat = this.balinfo.data.coinList?.fees_flat;
        alert.dismiss()
      },
      (error) => { }
    );
  }

  back() {
    this.location.back();
  }

  Wallet(coin, type, action) {
    if (action === 1) {
      if (type === 'crypto') {
        this.nav.navigateRoot('/deposit-model', {
          queryParams: { coin: coin, type: type, action: action },
        });
      } else {
        this.nav.navigateRoot('/fiat-deposit', {
          queryParams: { coin: coin, type: type, action: action },
        });
      }
    } else {
      if (type === 'crypto') {
        this.nav.navigateRoot('/deposit-model', {
          queryParams: { coin: coin, type: type, action: action },
        });
      } else {
        this.nav.navigateRoot('/fiat-out', {
          queryParams: { coin: coin, type: type, action: action },
        });
      }
    }
  }

  history(name) {
    if (this.type === 'crypto') {
      this.nav.navigateRoot('/history', {
        queryParams: { coin: name, type: this.type },
      });
    } else {
      this.nav.navigateRoot('/fiat-history', {
        queryParams: { coin: name, type: this.type },
      });
    }
  }
  transfer() {
    console.log('transfer')
      this.nav.navigateRoot('/wallet-transfer');
    
  }
  doRefresh(event) {
    this.getCoinData();
    this.balanceDetails();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
