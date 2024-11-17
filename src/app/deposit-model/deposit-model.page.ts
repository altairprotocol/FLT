import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-deposit-model',
  templateUrl: './deposit-model.page.html',
  styleUrls: ['./deposit-model.page.scss'],
})
export class DepositModelPage implements OnInit {
  info: any;
  coin: any;
  networks: any;
  type: any;
  action: any;

  constructor(private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private route: ActivatedRoute, private nav: NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      console.warn(22, params);
      this.coin = params.coin;
      this.type = params.type;
      this.action = Number(params.action);

      console.log(this.action, params.action, typeof this.action);
    });
    this.getNetworks();
  }

  back() {
    this.location.back();
  }

  async getNetworks() {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });
    if (!this.coin) {
      console.log("No coin provided!")
      return
    }
    alert.present();
    this.exchangeProvider.getCoinNetworks(this.coin)
      .subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        this.networks = this.info.data;
        // console.log(41, this.info);
        alert.dismiss();
      }, error => {
        alert.dismiss();
        console.log(error);
      });
  }

  referToDeposit(selectedtype, network) {
    console.log(this.action, typeof this.action, 57);
    if (this.action == '1' || this.action == 1) {
      this.nav.navigateRoot('/deposit', {
        queryParams: { coin: this.coin, name: selectedtype, type: this.type, action: this.action, selectedType: network },
      });
    }
    else if (this.action == '2' || this.action == 2) {
      {
        this.nav.navigateRoot('/withdraw', {
          queryParams: { coin: this.coin, type: this.type, action: this.action, selectedType: selectedtype, network: network },
        });
      }

    }

    else {
      console.log("Wrong");

    }

  }

  doRefresh(event) {
    this.getNetworks();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}