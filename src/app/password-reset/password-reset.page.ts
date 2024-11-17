import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { Router } from '@angular/router';
import { emailRegex, strongPasswordRegex } from 'src/utils/regex';
import { ExchangeProvider } from '../codono.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {
  email: string;
  emailOTP: string;
  password: string;
  confirmPassword: string;
  emailValid: boolean = false;
  confirmPasswordValid: boolean = false;
  passwordValid: boolean = false;
  activeIndex = 0;
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

  constructor(private router: Router, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private nav: NavController) { }

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

  async onSlideNext() {
    const swiperInstance = this.swiperEl.nativeElement.swiper;
    this.activeIndex = swiperInstance.activeIndex + 1;
    if (swiperInstance.activeIndex === 1) {
      await this.sendOTPToEmail()
    }
    if (swiperInstance.activeIndex === swiperInstance.slides.length - 2) {
      this.changePassword()
    }
    if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
      this.nav.navigateForward('/login2')
    }
    else {
      swiperInstance.slideNext();
    }
  }

  onInput() {
    const result = this.email.match(emailRegex)
    if (result) {
      this.emailValid = true;
      return
    }
    this.emailValid = false;
  }

  onPassword() {
    const result = this.password.match(strongPasswordRegex)
    if (result) {
      this.passwordValid = true
      return
    }
    this.passwordValid = false
  }

  onConfirmPassword() {
    const result = this.password === this.confirmPassword
    if (result) {
      this.confirmPasswordValid = true
      return
    }
    this.confirmPasswordValid = false
  }

  onOtpChange(otp: string) {
    this.emailOTP = otp;
  }

  checkOTP() {
    console.log("called");
  }

  async sendOTPToEmail() {
    this.exchangeProvider
      .forgotcode(this.email)
      .subscribe(
        (data) => {
          console.log(this.activeIndex, 178);
          this.activeIndex = this.activeIndex;
          let response = JSON.parse(JSON.stringify(data as any[]));
          console.log("🚀 ~ Register2Page ~ emailcode ~ response:", response)
          if (response.status === 0 && response.data) {
            this.exchangeProvider.presentToast(response.data);
          }
          if (response.status === 1) {
            this.exchangeProvider.presentToast(response.data);
          }
        },
        (error) => {
          // loader.dismiss()
        }
      );
  }

  async changePassword() {
    const loader = await this.loadingCtrl.create()
    await loader.present()
    this.exchangeProvider
      .confirmcode(this.password, this.email, this.emailOTP)
      .subscribe(
        async (data) => {
          console.log(this.activeIndex, 178);
          this.activeIndex = this.activeIndex;
          let response = JSON.parse(JSON.stringify(data as any[]));
          console.log("🚀 ~ Register2Page ~ emailcode ~ response:", response)
          if (response.status === 0 && response.data) {
            this.exchangeProvider.presentToast(response.data);
          }
          if (response.status === 1) {
            this.exchangeProvider.presentToast(response.data);
          }
          await loader.dismiss()
        },
        async (error) => {
          await loader.dismiss()
        }
      );
  }

}
