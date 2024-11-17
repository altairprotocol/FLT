import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {
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

  constructor(private router: Router) { }

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
    if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
      this.router.navigate(['/tabs/home']);
    } else {
      swiperInstance.slideNext();
    }
  }
}
