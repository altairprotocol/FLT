import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { emailRegex, strongPasswordRegex } from 'src/utils/regex';
import { AuthService } from '../auth.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login2',
  templateUrl: './login2.page.html',
  styleUrls: ['./login2.page.scss'],
})
export class Login2Page implements OnInit {
  email: string;
  password: string;
  emailValid: boolean = false;
  passwordValid: boolean;
  rememberMe: any = null

  constructor(private location: Location,
    private storage: Storage,
    private authService: AuthService, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private barcodeScanner: BarcodeScanner) { 
      this.storage.create();

    }

  ngOnInit() {
    this.checkIDToken()
  }

  back() {
    this.location.back();
  }

  onInput() {
    const result = this.email.match(emailRegex)
    if (result) {
      this.emailValid = true;
      return
    }
    if (this.email.includes("@")) {
      this.emailValid = false;
      return
    } else {
      this.emailValid = true;
      return
    }
  }

  onPassword() {
    // TODO: Strong password
    if (true) {
      this.passwordValid = true
      return
    }
    const result = this.password.match(strongPasswordRegex)
    if (result) {
      this.passwordValid = true
      return
    }
    this.passwordValid = false
  }

  async login() {
    const pleaseWaitAlert = await this.loadingCtrl.create({
      message: 'Please wait...',
    });

    const loggingYouInAlert = await this.loadingCtrl.create({
      message: 'Logging you in...',
    });

    if (this.email && this.password) {
      
      if (this.rememberMe) {
        localStorage.setItem('rememberMe', 'true')
      }
      await pleaseWaitAlert.present()
      let loginData = { username: this.email, password: this.password }
      this.authService.postData(loginData, 'Login/Submit').then(
        async (loginResult: any) => {
          await this.storage.set('tempLoginData', { username: this.email, password: this.password });

          if (loginResult?.status === 1) {
            await pleaseWaitAlert.dismiss()
            await loggingYouInAlert.present()
            await loggingYouInAlert.dismiss()

            loginResult.data.username = this.email

            localStorage.setItem(
              'userData',
              JSON.stringify(loginResult.data)
            );


            this.nav.navigateRoot('/tabs/home');
          } else if(loginResult?.status === 2){
            await pleaseWaitAlert.dismiss();
            await loggingYouInAlert.dismiss()
            console.log('need to redirect to 2fa page',loginResult);
            this.nav.navigateRoot('enter-2fa');
            return;
            
          }else{
            await pleaseWaitAlert.dismiss()
            const msg = 'Something went wrong';
            this.exchangeProvider.presentToast(loginResult?.data ? loginResult.data : msg);
          }
        },
        async (err) => {
          await pleaseWaitAlert.dismiss()
          //Connection failed message
        }
      );
    } else {
      await pleaseWaitAlert.dismiss()
      const msg = 'Please enter valid username or password';
      this.exchangeProvider.presentToast(msg);
    }
  }

  async checkIDToken() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();
    const remem = localStorage.getItem('rememberMe');
    const userData = localStorage.getItem('userData');
    if (remem && userData) {
      const msg = "Logging you in..";
      this.exchangeProvider.presentToast(msg);
      this.exchangeProvider.exchange_userinfo().subscribe(
        (data) => {
          console.log(66, data);
          const userinfo = JSON.parse(JSON.stringify(data as any[]));
          console.log(userinfo, 67);
          if (userinfo.status === -99) {
            alert.dismiss();
          } else {
            alert.dismiss();
            this.nav.navigateForward('/tabs/home');
          }
        },
        (error) => {
          alert.dismiss();
        }
      );
    } else {
      alert.dismiss();
      console.log("Last time you didn't check RememberMe option");
    }
  }

  scanQRCode() {
    this.barcodeScanner.scan().then(
      async (barcodeData) => {
        try {
          const objDecoded = JSON.parse(barcodeData.text);
          const objDecodedCode = objDecoded.code;
          const decoded = this.localDecode(objDecodedCode);
          console.log(195, JSON.parse(decoded));
          if (decoded) {
            localStorage.setItem('userData', (decoded));
            localStorage.setItem('rememberme', 'true');
            return this.checkIDToken();
          } else {
            console.log(165, 'Could not decode');
            return false;
          }

        } catch (error) {
          console.log(165, error.message);
          return false;
        }
      },
      (err) => {
        console.log(JSON.stringify(err));
      }
    );
  }

  localDecode(encodedJson: string) {
    return atob(encodedJson);
  }

}
