import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { Router } from '@angular/router';
import { emailRegex, strongPasswordRegex } from 'src/utils/regex';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';


@Component({
  selector: 'app-register2',
  templateUrl: './register2.page.html',
  styleUrls: ['./register2.page.scss'],
})
export class Register2Page implements OnInit {
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

  constructor(private router: Router, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private navCtrl: NavController) { }

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

  // onSlideNext() {
  //   const swiperInstance = this.swiperEl.nativeElement.swiper;
  //   if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
  //     this.router.navigate(['/tabs/home2']);
  //   } else {
  //     swiperInstance.slideNext();
  //   }
  // }

  async onSlideNext() {
    const swiperInstance = this.swiperEl.nativeElement.swiper;
    this.activeIndex = swiperInstance.activeIndex + 1;
    if (swiperInstance.activeIndex === 1) {
      await this.sendOTPToEmail()
    }
    if (swiperInstance.activeIndex === swiperInstance.slides.length - 1) {
      await this.register()
    }
    swiperInstance.slideNext();
  }

  async register() {
    let loader = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    loader.present();
    if (
      this.email &&
      this.emailOTP &&
      this.password
    ) {
      this.exchangeProvider
        .signup(
          undefined,
          this.password,
          this.email,
          this.emailOTP,
          undefined
        )
        .subscribe(
          (data) => {
            loader.dismiss();
            let response = JSON.parse(JSON.stringify(data as any[]));

            if (!response) {
              const msg = "No Connection";
              this.exchangeProvider.presentToast(msg);
            }
            if (response.status === 0 && response.data) {
              this.exchangeProvider.presentToast(response.data);
            }
            if (response.status === 1) {
              this.exchangeProvider.presentToast(response.data);
              this.navCtrl.navigateForward('login2')
            }
          },
          (error) => {
            loader.dismiss()
          }
        );
    } else {
      loader.dismiss();

      const msg = "Please check all fields."
      this.exchangeProvider.presentToast(msg);
    }
  }


  // onSlideChange(e: any) {
  // console.log('changed: ', e);
  // const swiperInstance = this.swiperEl.nativeElement.swiper;
  // console.log(swiperInstance.activeIndex);
  // this.activeIndex = swiperInstance.activeIndex;
  // }


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
    const postData = {
      email: this.email,
    };
    this.exchangeProvider
      .exchange_basicpost(`Login/emailcode/`, postData)
      .subscribe(
        (data) => {
          console.log(this.activeIndex, 178);

          // loader.dismiss();
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

}
