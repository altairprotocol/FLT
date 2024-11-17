import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@Component({
  selector: 'app-deposit-detail',
  templateUrl: './deposit-detail.page.html',
  styleUrls: ['./deposit-detail.page.scss'],
})
export class DepositDetailPage implements OnInit {
  deposit: any;

  constructor(
    private clipboard: Clipboard,
    private route: ActivatedRoute,
    private nav: NavController,
    private toastCtrl: ToastController,
    private exchangeProvider: ExchangeProvider
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.deposit = params;
    });
  }

  back() {
    this.nav.navigateForward('/history');
  }

  // copyString(data) {
  //   this.clipboard.copy(data);
  //   if (data) {
  //     const msg = 'Copied';
  //     this.presentToast(msg);
  //   }
  // }

  async presentToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 4500,
    });
    toast.present();
  }

  copyString(data) {
    this.clipboard.copy(data);
    if (data) {
      const msg = 'Copied';
      this.exchangeProvider.presentToast(msg);
    }
    console.log(this.clipboard);
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
