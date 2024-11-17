import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { SwiperOptions } from 'swiper/types';
import { ExchangeProvider } from '../codono.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit {
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
  storeItems: any[] = null
  exchangeUrl = environment.exchangeUrl + '/';

  constructor(private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) { }

  ionViewDidEnter() {
    return
    this.swiperEl.nativeElement.initialize();
    this.swiperEl.nativeElement.swiperParams = this.swiperParams;
    this.swiperEl.nativeElement.config = this.swiperParams;

    this.swiperEl.nativeElement.swiper.params = {
      ...this.swiperEl.nativeElement.swiper.params,
      ...this.swiperParams,
    };

    this.swiperEl.nativeElement.swiper.update();
  }

  onSlideNext() {
    const swiperInstance = this.swiperEl.nativeElement.swiper;
    swiperInstance.slideNext();
    // if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
    //   this.router.navigate(['/tabs/home2']);
    // } else {
    // }
  }

  async storeIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.storeIndex().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.storeItems = response?.data?.list
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  ngOnInit() {
    this.storeIndex()
  }

  back() {
    this.location.back()
  }

  refer(path: string) {
    this.nav.navigateRoot(path)
  }

  viewItem(id: any) {
    this.nav.navigateForward('store-buy', {
      queryParams: { id },
    });
  }

}
