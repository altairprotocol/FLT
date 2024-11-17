import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { ActionSheetController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accurateNumber'
})
export class AccurateNumberPipe implements PipeTransform {

  transform(value: any): string {
    if (!value) {
      return "0"
    }
    if (typeof value === 'string') {
      value = Number(value)
    }
    return value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 15 });
  }

}

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  walletHeading: string = 'My Assets'
  coins: any;
  cryptoCoins: any;
  fiatCoins: any;
  reserve: any;
  available: any = '--';
  info: any;
  intrading: any;
  worth: any = '--';
  wallets: any = null
  baltypes: string[] = null
  accountsValuation: any = null
  showZero: boolean = false;
  worthHidden: boolean = false;
  showSearchBar: boolean = false;
  search: string = null;
  showMyAccounts: boolean = true;
  showWalletData: boolean = false
  currentSegment: string = 'crypto'

  constructor(private actionSheetCtrl: ActionSheetController, public location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private nav: NavController, private alertController: AlertController) {
    const storedValue = localStorage.getItem('showZero');
    this.showZero = storedValue === 'true';
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'History',
      buttons: [
        {
          text: 'Crypto',
          role: 'cancel',
          handler: () => {
            this.nav.navigateForward('/history');
          },
        },
        {
          text: 'Fiat',
          role: 'confirm',
          handler: () => {
            this.nav.navigateForward('/fiat-history', { queryParams: { coin: 'usd', type: 'crypto' } });
          },
        },
      ],
    });

    await alert.present();
  }

  toggleShowSearchBar() {
    this.showSearchBar = !this.showSearchBar;
  }

  toggleTotalWorth() {
    if (this.worthHidden) {
      this.worthHidden = false
    } else {
      this.worthHidden = true
    }
  }

  ngOnInit() {
    this.updateShowZeroFromLocalStorage();
    this.getWalletData()
    // this.loadUserWallet()
    // this.loadUserAssets()

  }

  back() {
    this.location.back();
  }

  async getWalletData() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await alert.present();
    this.exchangeProvider.exchange_wallet().subscribe(async (res: any) => {
      if (res?.status === -99) {
        localStorage.clear();

        this.nav.navigateRoot('login2');
        
      }
      this.coins = res?.data?.spot;
      this.cryptoCoins = res?.data?.spot?.filter((item) => (item?.type == 'crypto'));
      this.fiatCoins = res?.data?.spot?.filter((item) => (item?.type == 'fiat'));
      this.info = res;
      this.reserve = this.coins; //backup data
      this.baltypes = res?.data?.baltypes;
      this.accountsValuation = res?.data?.valuation
      console.log("🚀 ~ WalletPage ~ this.exchangeProvider.exchange_wallet ~ accountsValuation:", this.accountsValuation, this.baltypes)
      this.wallets = res?.data?.wallets;
      await alert.dismiss();
    })
  }

  async loadUserAssets() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await alert.present();
    this.exchangeProvider.userAssets("spot").subscribe(async (res: any) => {
      if (res?.status === -99) {
        this.nav.navigateRoot('login2');
      }
      console.log(res);
      await alert.dismiss();
    })
  }

  async loadUserWallet() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    await alert.present();
    this.exchangeProvider.userWallet().subscribe(async (res: any) => {
      if (res?.status === -99) {
        this.nav.navigateRoot('login2');
      }
      console.log(res);
      await alert.dismiss();
    })
  }

  updateShowZeroFromLocalStorage() {
    const storedValue = localStorage.getItem('showZero');
    this.showZero = storedValue === 'true';
  }

  toggleHideBalance() {
    this.showZero = !this.showZero;
    localStorage.setItem('showZero', this.showZero.toString());
    console.log('showZero:', this.showZero);
  }

  async segmentChanged(ev: any) {
    console.log(ev)
  }

  getItems(ev) {
    var val = ev.target.value;

    if (val === '') {
      this.coins = this.reserve;
      return;
    }

    if (!val || val.trim() === '' || val === null) {
      this.coins = this.reserve;
      this.coins = this.coins.filter((item) => (item.symbol.toLowerCase().indexOf(this.search.toLowerCase()) > -1));
    }
    if (val && val.trim() !== '') {
      this.coins = this.reserve.filter((item) => (item.symbol.toLowerCase().indexOf(val.toLowerCase()) > -1));
    }
  }

  searchwallet(type) {
    this.nav.navigateForward('/search-wallet', { queryParams: { type: type } });
  }

  balance(name, type) {
    this.nav.navigateForward('/balance', {
      queryParams: { coin: name, type: type },
    });
  }

  doRefresh(event) {
    this.updateShowZeroFromLocalStorage();
    this.getWalletData()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

  comingSoon() {
    this.exchangeProvider.presentToast("Coming soon.")
  }

  changeActiveSegment(currentSegment: string) {
    this.currentSegment = currentSegment;
    if (currentSegment == 'crypto') {
      this.coins = this.cryptoCoins
    } else {
      this.coins = this.fiatCoins
    }
  }

  showWalletDataFn(type: string) {
    if (type === 'spot') {
      this.walletHeading = 'Spot Wallet'
      this.showMyAccounts = false
      this.showWalletData = true
      this.coins = this.cryptoCoins
      console.log(typeof this.coins);
    } else if (type === 'p2p') {
      this.walletHeading = 'P2P Wallet'
      this.showMyAccounts = false
      this.showWalletData = true
      this.coins = this.wallets?.['p2p']
      console.log(typeof this.coins, this.wallets);

    } else if (type === 'staking') {
      this.walletHeading = 'Staking Wallet'
      this.showMyAccounts = false
      this.showWalletData = true
      this.coins = this.wallets?.['staking']
    } else if (type === 'stock') {
      this.walletHeading = 'Stock Wallet'
      this.showMyAccounts = false
      this.showWalletData = true
      this.coins = this.wallets?.['stock']
    } else {
      this.exchangeProvider.presentToast("Coming soon.")
    }
  }

  hideWalletData() {
    this.walletHeading = 'My Assets'
    this.showMyAccounts = true
    this.showWalletData = false
    this.coins = this.reserve
  }

  refer(path: string) {
    this.nav.navigateForward(path)
  }

  async onWithdraw() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select one',
      cssClass: 'fs-bolder linkme',
      subHeader: 'Withdraw Crypto / Fiat through SPOT wallet or P2P',
      buttons: [
        {
          text: 'Withdraw',
          icon: 'wallet',
          handler: () => {
            this.showWalletDataFn('spot')
          },
        },
        {
          text: 'P2P',
          icon: 'people',
          handler: () => {
            this.nav.navigateForward('p2p-main')
          },
        },
        {
          text: 'Cancel',
          icon: 'close-circle',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  onDeposit() {
    this.showWalletDataFn('spot')
  }

  isArray(data) {
    return Array.isArray(data)
  }

}
