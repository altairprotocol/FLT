import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-p2p-post-ad',
  templateUrl: './p2p-post-ad.page.html',
  styleUrls: ['./p2p-post-ad.page.scss'],
})
export class P2pPostAdPage implements OnInit {
  activeIndex = 0;
  buyingOrSelling: string = "buy"
  allowedCrypto: any[] = null
  fiatList: any[] = null

  selectedCrypto: string = 'usdt'
  selectedFiat: string = 'usd'
  priceType: any = '1'
  amount: any = 0
  marketPrice: any = 0

  minAmount: any = 0
  maxAmount: any = 0
  paymentMethod: any = null
  timeLimit: any = "15"

  terms: any = null
  autoReply: any = null
  completedKYC: any = false
  registeredWithinWeek: any = false
  walletAbove5: any = false

  online: any = 1

  swiperParams: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  @ViewChild('swiper', { static: true }) swiperEl!: ElementRef | any;
  constructor(private location: Location, private router: Router, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider) { }


  ionViewDidEnter() {
    this.swiperEl.nativeElement.initialize();
    this.swiperEl.nativeElement.swiperParams = this.swiperParams;
    this.swiperEl.nativeElement.config = this.swiperParams;

    this.swiperEl.nativeElement.swiper.params = {
      ...this.swiperEl.nativeElement.swiper.params,
      ...this.swiperParams,
    };

    this.swiperEl.nativeElement.swiper.update();
  }

  ngOnInit() {
    this.p2pIndex()
    this.getMarketPrice()
  }

  back() {
    this.location.back()
  }

  changeAmount(type) {
    if (type == "increment") {
      this.amount += 0.5
    } else if (type == "decrement") {
      if (this.amount - 0.5 >= 0) {
        this.amount -= 0.5
      }
    }
  }

  onSlideNext() {
    const swiperInstance = this.swiperEl.nativeElement.swiper;
    this.activeIndex = swiperInstance.activeIndex + 1;
    if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
      this.postAd()
      // this.router.navigate(['/tabs/home']);

    } else {
      swiperInstance.slideNext();
    }
  }

  async p2pIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pIndex("buy", "usd", "usdt").subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.fiatList = response?.data?.FiatList
          this.allowedCrypto = response?.data?.allow_cryptos
          // this.fiatMethods = response?.data?.FiatMethods
          // this.userBalance = response?.data?.user_balance
          // this.userBanks = response?.data?.user_banks
          // this.userPaymentMethods = response?.data?.user_payment_methods
          await loader.dismiss()
        }
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

  segmentChanged(ev: any) {
    this.buyingOrSelling = ev.detail.value;
  }

  async postAd() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()

    let fiat = this.selectedFiat;
    let coin = this.selectedCrypto;
    let amount = 5;
    let price_type = this.buyingOrSelling == 'buy' ? '1' : '2';
    let fixed_price = this.amount;
    let ad_type = this.priceType;
    let floating = null;
    let available = 10;
    let time_limit = this.timeLimit;
    let min_limit = this.minAmount;
    let max_limit = this.maxAmount;
    let terms = this.terms;
    let autoreply = this.autoReply;
    let cond_kyc = this.completedKYC;
    let cond_reg = this.registeredWithinWeek ? 1 : null;
    let cond_reg_ago = this.registeredWithinWeek;
    let cond_balance = this.walletAbove5;
    let cond_min_bal = null;
    let online = this.online;
    let bankList = null;

    this.exchangeProvider.p2pdoNewAd(fiat,
      coin,
      amount,
      price_type,
      fixed_price,
      ad_type,
      floating,
      available,
      time_limit,
      min_limit,
      max_limit,
      terms,
      autoreply,
      cond_kyc,
      cond_reg,
      cond_reg_ago,
      cond_balance,
      cond_min_bal,
      online,
      bankList).subscribe(
        async (data) => {
          const response = JSON.parse(JSON.stringify(data as any));
          console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
          if (response?.status === 1) {
            this.exchangeProvider.presentToast(response?.data)
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

  async getMarketPrice() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pGrabPrice(this.selectedFiat, this.selectedCrypto).subscribe(
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

