import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-p2p-main-express',
  templateUrl: './p2p-main-express.page.html',
  styleUrls: ['./p2p-main-express.page.scss'],
})
export class P2pMainExpressPage implements OnInit {
  activeMethod: string = 'Buy'
  activeFiat: string = 'USD'
  activeCrypto: string = 'USDT'
  marketPrice: any = null
  calculatedPrice: any = null
  amount: any = '0.00'
  adID: any = null
  fiatList: any[] = null

  constructor(private route: ActivatedRoute, private location: Location, private exchangeProvider: ExchangeProvider, private nav: NavController, private loadingCtrl: LoadingController, private alert: AlertController) {
    this.route.queryParams.subscribe((params) => {
      this.fiatList = params?.fiatList ? JSON.parse(params?.fiatList) : null,
        this.activeCrypto = params?.activeCrypto
    });
  }

  ngOnInit() {
    this.getMarketPrice();
  }

  changeActiveMethod(method: string) {
    this.activeMethod = method
  }

  back() {
    this.location.back()
  }

  manipulateAmount(key: string) {
    if (key == 'backspace') {
      if (this.amount.length == 1) {
        this.amount = '0'
      } else {
        this.amount = this.amount.substring(0, this.amount.length - 1);
      }
    } else {
      if (this.amount == '0' || this.amount == '0.00') {
        this.amount = key;
      } else {
        this.amount += key;
      }
    }
    this.calculatedPrice = this.marketPrice * this.amount
  }

  referToPaymentMethod() {
    this.nav.navigateForward("p2p-main-payment-method")
  }

  async doTrade() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pExpress(this.activeMethod?.toLowerCase(), this.activeFiat?.toLowerCase(), this.activeCrypto?.toLowerCase(), this.calculatedPrice).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.exchangeProvider.presentToast("Successful")
          this.nav.navigateForward('p2p-buy-pay', {
            queryParams: {
              adData: JSON.stringify(response?.data?.found),
              quantity: this.amount,
            }
          })
        }
        await loader.dismiss()
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

  // async getMarketPrice() {
  //   let loader = await this.loadingCtrl.create({ message: "Please wait.." })
  //   await loader.present()
  //   this.exchangeProvider.p2pGrabPrice(this.selectedFiat, this.selectedCrypto).subscribe(
  //     async (data) => {
  //       const response = JSON.parse(JSON.stringify(data as any));
  //       console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
  //       if (response?.status === 1) {
  //         this.marketPrice = response?.data?.value
  //         await loader.dismiss()
  //       }
  //     },
  //     async (error) => {
  //       console.log(error)
  //       await loader.dismiss()
  //     }
  //   )
  // }

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
          }
        }
      ]
    });

    await alert.present();
  }

  async getMarketPrice() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pGrabPrice(this.activeFiat?.toLowerCase(), this.activeCrypto?.toLowerCase()).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.marketPrice = response?.data?.value
          await loader.dismiss()
        }
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

}
