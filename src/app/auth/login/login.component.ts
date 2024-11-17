import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/auth.service';
import { ExchangeProvider } from 'src/app/codono.service';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  responseData: any;
  userData = { username: null, password: null };
  rememberMe: boolean = false;
  passwordType = 'password';
  agreeToPolicies: boolean = true;

  constructor(private nav: NavController,
    public menuCtrl: MenuController,
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public authService: AuthService,
    public location: Location,
    public exchangeProvider: ExchangeProvider,
    private barcodeScanner: BarcodeScanner
  ) { }

  back() {
    this.location.back();
  }

  ngOnInit() {
    console.log('Login loaded')
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.checkIDToken();
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

  async login() {
    console.log(this.userData.username)
    console.log(this.userData.password)
    console.log(this.agreeToPolicies);

    if (!this.agreeToPolicies) {
      this.exchangeProvider.presentToast("Please agree to Terms of Service and Privacy Policy");
      return
    }
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    await alert.present();

    if (this.userData.username && this.userData.password) {
      this.authService.postData(this.userData, 'Login/Submit').then(
        (loginResult) => {
          this.loadingCtrl.dismiss();
          this.responseData = loginResult;

          if (this.responseData.status === 1) {
            if (this.rememberMe) {
              localStorage.setItem('rememberMe', String(this.rememberMe));
            }

            localStorage.setItem(
              'userData',
              JSON.stringify(this.responseData.data)
            );

            if (this.responseData.data.fundpass === 0) {
              this.nav.navigateRoot('/tabs/home');
            } else {
              this.nav.navigateRoot('/tabs/home');
            }

            //console.log(localStorage.getItem('userData'));
          } else {
            const msg = 'Please enter valid username or password';
            this.exchangeProvider.presentToast(msg);
          }
        },
        (err) => {
          //Connection failed message
        }
      );
    } else {
      this.loadingCtrl.dismiss();
      const msg = 'Please enter valid username or password';
      this.exchangeProvider.presentToast(msg);
    }
  }

  scanQRCode() {
    this.barcodeScanner.scan().then(
      async (barcodeData) => {
        //this should be scanned text {"code":"someencryptedtext"}
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
        // An error occurred
        console.log(JSON.stringify(err));
      }
    );
  }

  localDecode(encodedJson: string) {
    return atob(encodedJson);
  }

  doRefresh(event) {
    this.ionViewWillEnter()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
