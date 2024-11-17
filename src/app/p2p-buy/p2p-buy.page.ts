import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-p2p-buy',
  templateUrl: './p2p-buy.page.html',
  styleUrls: ['./p2p-buy.page.scss'],
})
export class P2pBuyPage implements OnInit {
  isBuying: boolean = true;
  activeSegment: string = 'With Fiat';
  paymentMethod: any = null
  adData: any = null
  userEnteredAmount: any = null
  paymentMethods: any = null

  calculatedUSDT: number = 0;
  calculatedFiat: number = 0;

  constructor(private route: ActivatedRoute, private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private nav: NavController) {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        console.log("🚀 ~ P2pBuyPage ~ this.route.queryParams.subscribe ~ params:", params)
        console.log(params?.isBuying == 'true');

        this.isBuying = params?.isBuying == true || params?.isBuying == 'true' ? true : false;
        this.adData = params?.adData ? JSON.parse(params?.adData) : null
      }

    });
  }

  ngOnInit() {
    this.paymentMethodsIndex()
  }

  async paymentMethodsIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    // @ts-ignore
    this.exchangeProvider.p2pPaymentSettings().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ P2pMainPaymentMethodPage ~ response:", response)
        if (response?.status === 1) {
          this.paymentMethods = response?.data?.UserBank
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  back() {
    this.location.back()
  }

  changeSegment(segment: string) {
    this.activeSegment = segment
    this.calculatePrice()
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }

  calculatePrice() {
    if (this.activeSegment == 'With Fiat') {
      if (this.userEnteredAmount > 0) {
        this.calculatedUSDT = this.userEnteredAmount / this.adData?.value?.fixed_price;
      } else {
        this.calculatedUSDT = 0;
      }
    } else {
      if (this.userEnteredAmount > 0) {
        this.calculatedFiat = this.userEnteredAmount * this.adData?.value?.fixed_price;
      } else {
        this.calculatedFiat = 0;
      }
    }
  }

  canBuy(): boolean {
    let paymentMethodRequired = this.isBuying ? true : (this.paymentMethod !== null);
    if (this.activeSegment === 'With Fiat') {
      return this.calculatedUSDT >= this.adData?.value?.min_limit && this.calculatedUSDT <= this.adData?.value?.max_limit && paymentMethodRequired
    } else if (this.activeSegment === 'With Crypto') {
      return this.userEnteredAmount >= this.adData?.value?.min_limit && this.userEnteredAmount <= this.adData?.value?.max_limit && paymentMethodRequired
    }
    return false;
  }

  async doTrade() {
    if (!this.paymentMethod) {
      this.paymentMethod = this.paymentMethods?.[0]?.id
    }
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.userEnteredAmount, this.calculatedUSDT, '1', this.adData?.value?.orderid, '2', 'bank'
    this.exchangeProvider.p2pDoTrade(this.userEnteredAmount, this.calculatedUSDT, this.paymentMethod, this?.adData?.value?.orderid, '2', this.paymentMethod ? 'bank' : 'others').subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.nav.navigateForward('/p2p-buy-pay', {
            queryParams: { quantity: this.activeSegment == 'With Fiat' ? this.calculatedUSDT : this.userEnteredAmount, adData: JSON.stringify(this.adData) },
          });
        } else {
          this.exchangeProvider.presentToast(response?.data)
        }
        await loader.dismiss()
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

}
