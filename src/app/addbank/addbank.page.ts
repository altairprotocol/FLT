import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-addbank',
  templateUrl: './addbank.page.html',
  styleUrls: ['./addbank.page.scss'],
})
export class AddbankPage implements OnInit {

  info: any;
  banks: any;
  selectedbank: any;
  addressname: any;
  bankprov: any;
  bankcity: any;
  bankaddr: any;
  truename: any;
  bankcard: any;
  fundpassword: any;
  selectcoin: any;
  type: any;
  action: any;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public exchangeProvider: ExchangeProvider, public loadingCtrl: LoadingController, private location: Location, private route: ActivatedRoute,) {
  }

  async ngOnInit() {
    console.log('ionViewDidLoad AddbankPage');

    this.route.queryParams.subscribe((params) => {
      this.selectcoin = params.coin;
      this.type = params.type;
      this.action = params.action;
    });

    // Loading banks list

    const alert = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    alert.present();
    this.exchangeProvider.addbank()
      .subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        // console.log(this.info.data);
        this.banks = this.info.data.UserBankType;
        alert.dismiss();
      }, error => {
        console.log(error);
        alert.dismiss()
          .then()
          .catch(insideError => {
            console.log(insideError);
          });
      });
  }

  async doaddbank() {
    console.log('doAddBank');

    const alert = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    alert.present();

    this.exchangeProvider.doAddBank(this.addressname, this.selectedbank, this.bankprov, this.bankcity, this.bankaddr, this.bankcard, this.fundpassword, this.truename)
      .subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        // console.log(this.info.data);
        alert.dismiss();
        if (this.info.status === 1) {
          this.navCtrl.navigateForward('/fiat-out', {
            queryParams: { coin: this.selectcoin, type: this.type, action: this.action },
          });
        }
        this.exchangeProvider.presentToast(this.info.data);
      }, error => {
        console.log(error);
        alert.dismiss()
          .then()
          .catch(insideError => {
            console.log(insideError);
          });
      });

  }

  back() {
    this.location.back();
  }

  doRefresh(event) {
    this.ngOnInit()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
