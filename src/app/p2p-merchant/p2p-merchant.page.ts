import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-p2p-merchant',
  templateUrl: './p2p-merchant.page.html',
  styleUrls: ['./p2p-merchant.page.scss'],
})
export class P2pMerchantPage implements OnInit {
  finalSlide: boolean = false
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

  ngOnInit() { }

  onSlideNext() {
    const swiperInstance = this.swiperEl.nativeElement.swiper;
    if (swiperInstance.activeIndex === swiperInstance.slides.length - 2) {
      this.finalSlide = true
    }
    if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
      this.applyForMerchant()
    } else {
      swiperInstance.slideNext();
    }
  }

  async applyForMerchant() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pDoApply().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.exchangeProvider.presentToast(response?.data)
        } else {
          this.exchangeProvider.presentToast(response?.data)
          setTimeout(() => {
            this.location.back()
          }, 2000);
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
