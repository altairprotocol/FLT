import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-otc-confirm',
  templateUrl: './otc-confirm.page.html',
  styleUrls: ['./otc-confirm.page.scss'],
})
export class OtcConfirmPage implements OnInit {
  base_coin: any = null;
  trade_coin: any = null;
  base_coin_amount: any = null;
  trade_coin_amount: any = null;
  time_left: any = null;
  id: any = null;

  constructor(private nav: NavController, private location: Location, private route: ActivatedRoute, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.base_coin = params.base_coin;
      this.trade_coin = params.trade_coin;
      this.base_coin_amount = params.input2;
      this.trade_coin_amount = params.input1;
      this.time_left = params.time_left
      this.id = params.id

      this.countDown()
    });
  }

  countDown() {
    setInterval(() => {
      if (this.time_left > 0) {
        this.time_left = this.time_left - 1
      }
    }, 1000);
  }


  back() {
    this.location.back()
  }

  async confirm() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.otcapprovequote(this.id).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        await loader.dismiss()
        if (response?.status === 0) {
          this.exchangeProvider.presentToast(response?.data)
        } else {
          if (typeof response?.msg === 'string') {
            this.exchangeProvider.presentToast(response?.msg)
            this.nav.navigateForward('otc-history')
          }
        }
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

}
