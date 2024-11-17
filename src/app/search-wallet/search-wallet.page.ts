import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-search-wallet',
  templateUrl: './search-wallet.page.html',
  styleUrls: ['./search-wallet.page.scss'],
})
export class SearchWalletPage implements OnInit {
  data: any;
  item: any;
  info: any;
  coins: any;
  reserve: any;
  available: any;
  intrading: any;
  worth: any;
  search: any;
  cointype: any;

  constructor(private nav: NavController, private location: Location, public menuCtrl: MenuController, private loadingCtrl: LoadingController, public exchangeProvider: ExchangeProvider, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.cointype = params.type;
        // console.log(this.cointype);
      });

    this.getBalance();
  }

  back() {
    this.location.back();
    // this.nav.navigateForward("/tabs/tabs/home");
  }

  deposit() {
    this.nav.navigateForward('/deposit');
  }



  async getBalance() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...'
    });

    await alert.present();

    this.exchangeProvider.exchange_wallet()
      .subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        this.loadingCtrl.dismiss();
        // console.log(this.info)

        if (this.info.status === -99) {
          console.log('logged out');
          localStorage.clear();
          this.nav.navigateRoot('login2');
        }


        this.coins = this.info.data;
        this.reserve = this.coins; //backup data
        this.available = this.info.fiat.available;
        this.intrading = this.info.fiat.intrading;
        this.worth = this.info.fiat.worth;
        // console.log(this.coins);


      }, error => {

        this.loadingCtrl.dismiss()
          .then()
          .catch(error => {
          });
      });


  }

  balance(name, type) {
    if (type === 'crypto') {
      if (this.cointype === '1') {

        this.nav.navigateForward('/deposit-model', { queryParams: { 'coin': name, 'type': type, 'action': 1 } });
      } else {

        this.nav.navigateForward('/deposit-model', { queryParams: { 'coin': name, 'type': type, 'action': 2 } });
      }
    } else {
      if (this.cointype === '1') {
        this.nav.navigateForward('/fiat-deposit', { queryParams: { 'coin': name, 'type': type } });
      } else {
        this.nav.navigateForward('/fiat-out', { queryParams: { 'coin': name, 'type': type } });
      }
    }
  }
  getItems(ev) {
    // Reset items back to all of the items
    //  this.initializeItems();



    // set val to the value of the ev target
    const val = ev.target.value;

    if (val === '') {
      this.coins = this.reserve;
      return;
      // console.log(this.coins);
    }

    // if the value is an empty string don't filter the items
    if (!val || val.trim() === '' || val === null) {
      this.coins = this.reserve;
      this.coins = this.coins.filter((item) => (item.symbol.toLowerCase().indexOf(this.search.toLowerCase()) > -1));
    }
    if (val && val.trim() !== '') {
      this.coins = this.reserve.filter((item) => (item.symbol.toLowerCase().indexOf(val.toLowerCase()) > -1));
    }
  }

  doRefresh(event) {
    this.getBalance();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
