import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { ExchangeProvider } from 'src/app/codono.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  userData = {
    username: '',
    password: '',
    email: '',
    code: '',
    invite: '',
    acceptterms: false,
  };
  toggleCode: string = 'hidden';
  info: any;

  constructor(public location: Location, private menuCtrl: MenuController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public exchangeProvider: ExchangeProvider,
    public authService: AuthService,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    console.log('Register loaded')
  }

  back() {
    this.location.back();
  }


  toggelInviteCode() {
    if (this.toggleCode === 'hidden') {
      this.toggleCode = 'show';
    } else {
      this.toggleCode = 'hidden';
    }
  }

  signUp() {
    if (this.userData.code === '') {
      console.log('Code field is empty');
      const msg = 'Please enter valid code.'
      this.exchangeProvider.presentToast(msg);
      return false;
    }

    if (this.userData.email === '') {
      console.log('Email field is empty');
      const msg = 'Please enter valid email.'
      this.exchangeProvider.presentToast(msg);
      return false;
    }


    if (this.userData.password === '') {
      console.log('password is empty');
      const msg = 'Please enter password.';
      this.exchangeProvider.presentToast(msg);
      return false;
    }

    if (this.userData.username === '') {
      console.log('username is empty');
      const msg = 'Please enter valid username.'
      this.exchangeProvider.presentToast(msg);
      return false;
    }

    if (this.userData.acceptterms === false) {
      console.log('Terms not accepted');
      const msg = 'Please accept Terms and Conditions'
      this.exchangeProvider.presentToast(msg);
      return false;
    }

    this.loadingCtrl.create({
      message: 'Loading...',
    });
    // this.loadingCtrl.present();
    if (
      this.userData.username &&
      this.userData.password &&
      this.userData.email &&
      this.userData.code
    ) {
      this.exchangeProvider
        .signup(
          this.userData.username,
          this.userData.password,
          this.userData.email,
          this.userData.code,
          this.userData.invite
        )
        .subscribe(
          (data) => {
            this.loadingCtrl.dismiss();
            this.info = JSON.parse(JSON.stringify(data as any[]));

            if (!this.info) {
              const msg = "No Connection";
              this.exchangeProvider.presentToast(msg);
            }
            if (this.info.status === 0 && this.info.data) {
              this.exchangeProvider.presentToast(this.info.data);
            }
            if (this.info.status === 1) {
              this.exchangeProvider.presentToast(this.info.data);
              this.navCtrl.navigateForward('login2')
            }
          },
          (error) => {
            //console.log(error);
            this.loadingCtrl
              .dismiss()
              .then()
              .catch((iError) => {
                console.log(iError);
              });
          }
        );
    } else {
      this.loadingCtrl.dismiss();

      const msg = "Please check all fields."
      this.exchangeProvider.presentToast(msg);
    }
  }

  emailcode(email) {
    this.loadingCtrl.create({
      message: 'Loading...',
    });
    // this.loadingCtrl.present();
    const postData = {
      email: email,
    };
    this.exchangeProvider
      .exchange_basicpost(`Login/emailcode/`, postData)
      .subscribe(
        (data) => {
          this.loadingCtrl.dismiss();
          this.info = JSON.parse(JSON.stringify(data as any[]));
          //console.log(this.info.status);
          if (this.info.status === 0 && this.info.data) {
            this.exchangeProvider.presentToast(this.info.data);
          }
          if (this.info.status === 1) {
            this.exchangeProvider.presentToast(this.info.data);
          }
        },
        (error) => {
          //console.log(error);
          this.loadingCtrl
            .dismiss()
            .then()
            .catch((iError) => {
              console.log(iError);
            });
        }
      );
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
