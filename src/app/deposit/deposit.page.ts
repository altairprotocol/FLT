import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.page.html',
  styleUrls: ['./deposit.page.scss'],
})
export class DepositPage implements OnInit {
  info: any;
  coinaddress_data: any;
  address: any = 'Not found';
  showqr: any;
  selected_coin: any;
  selected_type: any;

  constructor(private clipboard: Clipboard, private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selected_coin = params.coin;
      this.name = params.name;
      this.selected_type = params.selectedType;
    });
    this.getAddress();
  }

  back() {
    this.location.back();
  }

  async getAddress() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    await alert.present();

    this.exchangeProvider.exchange_addresses(this.name).subscribe(
      (data) => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        this.loadingCtrl.dismiss();
        this.coinaddress_data = this.info;
        this.address = this.info.wallet;
        this.showqr = this.info.showqr;
      },
      (error) => {
        this.loadingCtrl
          .dismiss()
          .then()
          .catch((insideError) => { });
      }
    );
  }
  name(name: any) {
    throw new Error('Method not implemented.');
  }

  copyString(data) {
    this.clipboard.copy(data);
    if (data) {
      const msg = 'Copied';
      this.exchangeProvider.presentToast(msg);
    }
    //console.log(this.clipboard);
  }

  doRefresh(event) {
    this.getAddress();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
