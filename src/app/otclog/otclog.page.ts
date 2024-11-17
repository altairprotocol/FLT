import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController, ToastController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-otclog',
  templateUrl: './otclog.page.html',
  styleUrls: ['./otclog.page.scss'],
})
export class OtclogPage implements OnInit {
  quoteinfo: any;
  qid: any;

  constructor(
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public nav: NavController,
    public exchangeProvider: ExchangeProvider,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.route.queryParams.subscribe((params) => {
      this.qid = params.qid;
    });
  }

  back() {
    this.location.back()
  }

  ngOnInit() {
    this.getqid()
  }

  async getqid() {
    if (!this.qid) return
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    alert.present();

    this.exchangeProvider.otclog(this.qid).subscribe(
      (data) => {
        let myinfo = JSON.parse(JSON.stringify(data as any[]));
        this.quoteinfo = myinfo.data;
        this.quoteinfo = Array.of(this.quoteinfo);

        alert.dismiss();
        if (myinfo.status === 0) {
          this.exchangeProvider.presentToast("Something went wrong!");
        }
      },
      (error) => {
        alert.dismiss();
      }
    );
  }

  toOTC() {
    this.nav.navigateForward('/tabs/otc');
  }

  doRefresh(event) {
    this.getqid()
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
