import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExchangeProvider } from '../codono.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-p2p-buy-pay-cancel',
  templateUrl: './p2p-buy-pay-cancel.page.html',
  styleUrls: ['./p2p-buy-pay-cancel.page.scss'],
})
export class P2pBuyPayCancelPage implements OnInit {
  id: any = '12'

  constructor(private route: ActivatedRoute, private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private nav: NavController) {
    this.route.queryParams.subscribe((params) => {
      this.id = params?.id ? params?.id : null
    });
  }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

  async cancelOrder() {
    if (!this.id) {
      return this.exchangeProvider.presentToast("Something went wrong")
    }
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pOrderCancel(this.id).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.exchangeProvider.presentToast("Order Cancelled Successfully")
          return this.nav.navigateForward('p2p-main')
        } else {
          this.exchangeProvider.presentToast(response?.data)
        }
        await loader.dismiss()
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

}
