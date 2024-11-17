import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from 'src/app/codono.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotpasswordComponent implements OnInit {
  resposeData: any;
  info: any;
  userData = { password: '', email: '', code: '' };
  isModalOpen = false;
  showPasswordField: boolean = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  onOtpChange(otp: string) {
    this.userData.code = otp;
  }



  constructor(private location: Location,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private exchangeProvider: ExchangeProvider) { }

  ngOnInit() {
    console.log('Forgot password loaded')
  }

  back() {
    this.location.back()
  }

  checkOTP() {
    if (this.userData.code.length === 6) {
      this.showPasswordField = true
    } else {
      this.exchangeProvider.presentToast("Please enter valid code.")
    }
  }

  async forgotcode(email) {
    if (this.userData.email === '') {
      const msg = 'Email field can not be empty.';
      this.exchangeProvider.presentToast(msg);
      return
    }
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    await alert.present();

    this.exchangeProvider.forgotcode(this.userData.email).subscribe(
      (data) => {
        this.loadingCtrl.dismiss();
        this.info = JSON.parse(JSON.stringify(data as any[]));
        if (this.info.status === 0 && this.info.data) {
          this.exchangeProvider.presentToast(this.info.data);
        }
        if (this.info.status === 1) {
          this.exchangeProvider.presentToast(this.info.data);
          this.setOpen(true);
        }
      },
      (error) => {
        this.loadingCtrl
          .dismiss()
          .then()
          .catch((iError) => { });
      }
    );
  }

  async confirm() {
    console.log(this.userData);

    if (this.userData.code === '') {
      const msg = 'Please fill all the fields';
      this.exchangeProvider.presentToast(msg);
    }

    if (this.userData.password === '') {
      const msg = 'Please fill all the fields';
      this.exchangeProvider.presentToast(msg);
    } else {
    }

    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    await alert.present();
    if (this.userData.password && this.userData.email && this.userData.code) {
      this.exchangeProvider
        .confirmcode(
          this.userData.password,
          this.userData.email,
          this.userData.code
        )
        .subscribe(
          (data) => {
            this.loadingCtrl.dismiss();
            this.info = JSON.parse(JSON.stringify(data as any[]));

            if (!this.info) {
              const msg = 'No Connection';
              this.exchangeProvider.presentToast(msg);
            }
            if (this.info.status === 0 && this.info.data) {
              this.exchangeProvider.presentToast(this.info.data);
            }
            if (this.info.status === 1) {
              this.exchangeProvider.presentToast(this.info.data);
              this.setOpen(false)
              this.back()
            }
          },
          (error) => {
            this.loadingCtrl
              .dismiss()
              .then()
              .catch((iError) => { });
          }
        );
    } else {
      this.loadingCtrl.dismiss();
      const msg = 'Please fill all the fields';
      this.exchangeProvider.presentToast(msg);
    }
  }

  resend() {
    this.forgotcode(this.userData.email)
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
