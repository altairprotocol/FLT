import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, AlertInput, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-p2p-main',
  templateUrl: './p2p-main.page.html',
  styleUrls: ['./p2p-main.page.scss'],
})
export class P2pMainPage implements OnInit {

  @ViewChild('popover') popover;

  p2pMode: string = 'P2P Trading'
  activeMethod: string = 'Buy'
  activeBaseMarket: string = "USDT";
  activeFiat: string = "USD";
  p2pIndexData: any = null
  p2pAds: any = null
  allowedCrypto: any[] = null
  fiatList: any[] = null
  fiatMethods: any[] = null
  userBalance: any = null
  userBanks: any = null
  userPaymentMethods: any = null

  isMenuOpen: boolean = false
  constructor(private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private alert: AlertController) { }

  ngOnInit() {
    this.p2pIndex()
  }

  changeActiveMethod(method: string) {
    this.activeMethod = method
    this.p2pIndex()
  }

  changeActiveBaseMarket(baseMarket: string) {
    this.activeBaseMarket = baseMarket
    this.p2pIndex()
  }

  back() {
    this.location.back()
  }

  async showWarning(adData: any) {
    const alert = await this.alert.create({
      header: 'Alert!',
      message: "When engaging in P2P transactions, please exercise caution and verify all transaction details carefully. Always use the platform's secure communication methods and avoid sharing sensitive personal information outside the platform. Be wary of suspicious or unverified buyers/sellers. If anything seems unusual, contact support immediately. Funds will be held securely during the transaction, but once released, they cannot be recovered. Always confirm receipt of payment before completing the trade.",
      buttons: [
        {
          text: 'Understood',
          handler: () => {
            this.nav.navigateForward('p2p-buy', {
              queryParams: { isBuying: this.activeMethod == 'Buy' ? true : false, adData: JSON.stringify(adData) },
            });
            // this.exchangeProvider.presentToast("Will be added soon!")
          }
        },
      ]
    });

    await alert.present();
  }

  // async doTrade() {
  //   let loader = await this.loadingCtrl.create({ message: "Please wait.." })
  //   await loader.present()
  //   this.exchangeProvider.p2pDoTrade(this.calculatedPrice, this.amount, 1, this.adID, 1).subscribe(
  //     async (data) => {
  //       const response = JSON.parse(JSON.stringify(data as any));
  //       console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
  //       if (response?.status === 1) {
  //       }
  //       await loader.dismiss()
  //     },
  //     async (error) => {
  //       console.log(error)
  //       await loader.dismiss()
  //     }
  //   )
  // }

  async p2pIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pIndex(this.activeMethod.toLowerCase(), this.activeFiat.toLowerCase(), this.activeBaseMarket.toLowerCase()).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.p2pAds = response?.data?.ads
          this.fiatList = response?.data?.FiatList
          this.fiatMethods = response?.data?.FiatMethods
          this.allowedCrypto = response?.data?.allow_cryptos
          this.userBalance = response?.data?.user_balance
          this.userBanks = response?.data?.user_banks
          this.userPaymentMethods = response?.data?.user_payment_methods
          await loader.dismiss()
        }
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }

  formatDate(unix_timestamp) {
    const d = new Date(unix_timestamp * 1000);

    const addLeadingZero = (num) => num < 10 ? `0${num}` : num;

    const day = addLeadingZero(d.getDate());
    const month = addLeadingZero(d.getMonth() + 1);
    const year = d.getFullYear();
    const hours = addLeadingZero(d.getHours());
    const minutes = addLeadingZero(d.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  changeP2PMode(ev: any) {
    let p2pMode = ev.detail.value
    if (p2pMode === 'express') {
      if (this.activeMethod == 'Buy') {
        this.nav.navigateForward('p2p-main-express', {
          queryParams: {
            fiatList: JSON.stringify(this.fiatList),
            activeCrypto: this.activeBaseMarket
          }
        })
      } else {
        this.nav.navigateForward('p2p-main-express', {
          queryParams: {
            fiatList: JSON.stringify(this.fiatList),
            activeCrypto: this.activeBaseMarket
          }
        })
      }
    } else if (p2pMode === 'p2pTrading') {
      this.nav.navigateForward('p2p-main')
    }
  }

  async changeFiatCurrency() {
    let generatedFiatOptions: any[] = this.fiatList.map(currency => ({
      label: currency.title,
      type: 'radio',
      value: currency.name,
    }));
    console.log("🚀 ~ P2pMainPage ~ generatedFiatOptions ~ generatedFiatOptions:", generatedFiatOptions)
    const alert = await this.alert.create({
      header: 'Choose currency',
      inputs: generatedFiatOptions,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: async (data: any) => {
            this.activeFiat = data?.toUpperCase()
            this.p2pIndex()
          }
        }
      ]
    });

    await alert.present();
  }


  showMenu(e: Event) {
    this.popover.event = e;
    this.isMenuOpen = true
  }

  refer(path: string) {
    if (this.isMenuOpen) {
      console.log("setting to false");
      // this.popover.event = null
      this.popover.dismiss()
      this.isMenuOpen = false
    }
    this.nav.navigateForward(path)
  }

}
