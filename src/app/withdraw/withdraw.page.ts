import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeProvider } from '../codono.service';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.page.html',
  styleUrls: ['./withdraw.page.scss'],
})
export class WithdrawPage implements OnInit {
  coin: any;
  type: any;
  selectedType: any;
  network: any;
  inputData = { sendto: '', amount: '', password: '' };
  balinfo: any;
  coin_total: any;
  coin_name: any;
  coin_symbol: any;
  fiat: string;
  conversion_coin: any;
  fees_percent: any;
  fees_flat: any;
  loading: any;
  sendAmount: any;
  leftSide: number;
  rightSide: number;
  msg: any;
  info: any;
  message: any;
  status: any;
  nav: any;
  tabtype: any;
  address: string = null;
  qrCode: string;

  constructor(private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private route: ActivatedRoute, private barcodeScanner: BarcodeScanner) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.coin = params.coin;
      this.type = params.type;
      this.selectedType = params.selectedType;
      this.network = params.network;
      console.log(this.coin);
      console.log(this.network);
    });
    this.balanceDetails()
  }

  back() {
    this.location.back();
  }

  async balanceDetails() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    await alert.present();

    this.exchangeProvider.exchange_coinbalance(this.coin, 8).subscribe(
      (data) => {
        this.balinfo = JSON.parse(JSON.stringify(data as any[]));
        alert.dismiss();
        // console.log(this.balinfo);
        this.coin_total = this.balinfo.data.coinList.xnb;
        this.coin_name = this.balinfo.data.coinList.name;
        this.coin_symbol = this.balinfo.data.coinList.symbol;

        this.fiat = parseFloat(this.balinfo.data.fiat).toFixed(2);
        this.conversion_coin = this.balinfo.data.conversion_coin;
        this.fees_percent = this.balinfo.data.coinList.fees_percent;
        this.fees_flat = this.balinfo.data.coinList.fees_flat;
      },
      (error) => {
        console.log(error);
        this.loading
          .dismiss()
          .then()
          .catch((error) => {
            console.log(error);
          });
      }
    );
  }

  calculateReceiveAmount() {
    if (this.sendAmount <= 0) {
      return false;
    }
    this.leftSide = this.sendAmount - this.fees_flat;
    this.rightSide = (100 - this.fees_percent) / 100;
    let result = this.leftSide * this.rightSide;
    let fees = this.sendAmount - result;
    this.msg;
    if (result < 0) {
      this.msg =
        'Insufficient Balance: fees required ' +
        fees +
        ' ' +
        this.coin.toUpperCase();
    } else {
      this.msg = 'You will receive ' + result;
    }
  }
  max() {
    this.leftSide = this.coin_total - this.fees_flat;
    this.rightSide = (100 - this.fees_percent) / 100;
    let result = this.leftSide * this.rightSide;
    this.sendAmount = this.coin_total;
    let fees = this.sendAmount - result;
    this.msg = '';
    if (result < 0) {
      this.msg =
        'Insufficient Balance: fees required ' +
        fees +
        ' ' +
        this.coin.toUpperCase();
    } else {
      this.msg = 'You will receive ' + result;
    }

    console.log(this.msg);
  }

  async send(fundpassword, sendAmount, coin_name, address, network) {
    console.log(fundpassword, sendAmount, coin_name, address, network);

    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    if (address === '') {
      console.log('Sendto field is empty');
      const msg = "Please fill out required fields!";
      this.exchangeProvider.presentToast(msg);
      return false;
    }

    if (sendAmount === '') {
      console.log('Amount field is empty');
      const msg = "Please fill out required fields!";
      this.exchangeProvider.presentToast(msg);
      return false;
    }

    if (fundpassword === '') {
      console.log('password is empty');
      const msg = "Please fill out required fields!";
      this.exchangeProvider.presentToast(msg);
      return false;
    } else {
      console.log('Everything is ok');
    }

    await alert.present();

    this.exchangeProvider
      .exchange_doWithdraw(fundpassword, sendAmount, coin_name, address, network)
      .subscribe(
        async (data) => {
          this.info = JSON.parse(JSON.stringify(data as any[]));
          this.message = this.info.data;
          this.status = this.info.status;
          this.loadingCtrl.dismiss();
          if (this.info.status === 1) {
            this.nav.navigateForward('/history', {
              queryParams: { coin: coin_name, tabtype: this.tabtype },
            });
          }
          this.exchangeProvider.presentToast(this.info.data);
          this.exchangeProvider.presentToast(this.message);
          await alert.dismiss();
        },
        (error) => {
          console.log('ERROR HERE');

          //this.presentToast(error.error);
          this.loading
            .dismiss()
            .then()
            .catch((error) => {
              console.log(error);
            });
        }
      );
    this.balanceDetails();
  }

  scanQRCode() {
    this.barcodeScanner.scan().then(
      (barcodeData) => {
        // Success! Barcode data is here
        this.qrCode = barcodeData.text;
        if (this.qrCode.includes('?amount=')) {
          //split amount
          const arr = this.qrCode.split('?amount=');
          //this.sendAmount=parseInt(arr[1]) + parseInt(this.fees_flat);
          //Below line adds transaction fees to withdrawal amount so that user gets exact amount he needs scanned from QR Code
          this.sendAmount = +(+arr[1] + +this.fees_flat).toFixed(8);
          const remaining = arr[0];

          //split coin type and address
          if (remaining.includes(':')) {
            const newarr = remaining.split(':');
            this.inputData.sendto = newarr[1];
          } else {
            this.inputData.sendto = remaining;
          }
        } else {
          //split coin type and address
          if (this.qrCode.includes(':')) {
            const arr = this.qrCode.split(':');
            this.inputData.sendto = arr[1];
          } else {
            this.inputData.sendto = this.qrCode;
          }
        }
      },
      (err) => {
        // An error occurred
        console.log(JSON.stringify(err));
      }
    );
  }

  doRefresh(event) {
    this.balanceDetails()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
