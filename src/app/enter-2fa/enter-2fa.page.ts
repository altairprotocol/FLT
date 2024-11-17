import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SwiperOptions } from 'swiper/types';
import { Router,ActivatedRoute } from '@angular/router';

import { ExchangeProvider } from '../codono.service';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-enter-2fa',
  templateUrl: './enter-2fa.page.html',
  styleUrls: ['./enter-2fa.page.scss'],
})
export class Enter2faPage implements OnInit {
  email: string;
  gacode: string;
  username:string;
  password: string;
  confirmPassword: string;
  emailValid: boolean = false;
  confirmPasswordValid: boolean = false;
  passwordValid: boolean = false;
  activeIndex = 0;
  loginData:any;
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

  constructor(private router: Router,
    private route: ActivatedRoute,
    private storage: Storage,
    private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private nav: NavController) { 

    }

  ionViewDidEnter() {
    
  }

  ngOnInit() { 

  }

 

  onOtpChange(otp: string) {
    this.gacode = otp;
  }

  checkOTP() {
    console.log("called");
  }

  async check2FA() {
    const loggingYouInAlert = await this.loadingCtrl.create({
      message: 'Logging you in...',
    });
    try{
      this.loginData = await this.storage.get('tempLoginData');
    }catch(e){
      this.loginData={'username':'','password':''};
      this.nav.navigateRoot('login2');
    }
    
    this.exchangeProvider
      .check2Fa(this.loginData?.username,this.loginData?.password,this.gacode)
      .subscribe(
        (data) => {
          console.log(this.activeIndex, 178);
          this.activeIndex = this.activeIndex;
          let loginResult = JSON.parse(JSON.stringify(data as any[]));
          console.log("🚀 ~ Register2Page ~ emailcode ~ loginResult:", loginResult)
          if (loginResult?.status === 1) {
           
            loginResult.data.username = this.email

            localStorage.setItem(
              'userData',
              JSON.stringify(loginResult.data)
            );
             loggingYouInAlert.present();
             loggingYouInAlert.dismiss();

            this.nav.navigateRoot('/tabs/home');
          }else{
            const msg = 'Issues:';
            this.exchangeProvider.presentToast(loginResult?.data ? loginResult.data : msg);
          }
        },
        (error) => {
          // loader.dismiss()
        }
      );
  }

 

}
