import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { Location } from '@angular/common';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@Component({
  selector: 'app-referral',
  templateUrl: './referral.page.html',
  styleUrls: ['./referral.page.scss'],
})
export class ReferralPage implements OnInit {
  referralID: string = null;
  referralLink: string = null;

  constructor(
    private clipboard: Clipboard,
    private route: ActivatedRoute,
    private nav: NavController,
    private toastCtrl: ToastController,
    private exchangeProvider: ExchangeProvider,
    private location: Location,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.myaffiliatecode();
  }

  back() {
    this.location.back()
  }

  async myaffiliatecode() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();
    this.exchangeProvider.myaffiliateinfo().subscribe(
      (data) => {
        alert.dismiss();
        let myinfo = JSON.parse(JSON.stringify(data as any[]));
        // this.username = myinfo.data.username;
        // this.truename = myinfo.data.truename;
        this.referralLink = myinfo.data.inviteurl;
        this.referralID = myinfo.data.invite;
        console.log(this.referralID);
        console.log(this.referralLink);
      },
      (error) => {
        //console.log(error);
        alert
          .dismiss()
          .then()
          .catch((iError) => {
            console.log(iError);
          });
      }
    );
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
    this.myaffiliatecode();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
