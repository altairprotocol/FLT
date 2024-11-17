import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-otcrecord',
  templateUrl: './otcrecord.page.html',
  styleUrls: ['./otcrecord.page.scss'],
})
export class OtcrecordPage implements OnInit {
  tradelogs: any;

  constructor(public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public nav: NavController,
    public exchangeProvider: ExchangeProvider,
    private location: Location) { }

  ngOnInit() {
    this.lasttrades()
  }

  back() {
    this.location.back()
  }

  async lasttrades() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();
    this.exchangeProvider.otcrecords().subscribe(
      (data) => {
        alert.dismiss();
        const myinfo = JSON.parse(JSON.stringify(data as any));
        this.tradelogs = myinfo.data.list;

        // console.log(this.tradelogs);
      },
      (error) => { }
    );
  }

  referToOtcLog(id) {
    this.nav.navigateForward('/otclog', {
      queryParams: { qid: id },
    });
  }

  doRefresh(event) {
    this.lasttrades()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
