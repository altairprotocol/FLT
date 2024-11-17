import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-p2p-order-info',
  templateUrl: './p2p-order-info.page.html',
  styleUrls: ['./p2p-order-info.page.scss'],
})
export class P2pOrderInfoPage implements OnInit {
  order: any = null
  orderID: any = null
  fullOrder: any = null
  adInfo: any = null
  payInfo: any = null
  constructor(private location: Location, private route: ActivatedRoute, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private nav: NavController) {
    this.route.queryParams.subscribe((params) => {
      this.orderID = params?.orderID ? params.orderID : null
    });
  }

  ngOnInit() {
    this.p2pViewOrder()
  }

  back() {
    this.location.back()
  }

  async p2pViewOrder() {
    if (!this.orderID || !this.orderID) {
      return
    }
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()

    this.exchangeProvider.p2pViewOrder(this.orderID).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ ConvertPage ~ this.exchangeProvider.convertIndex ~ response:", response)
      if (response?.status === 1) {
        this.fullOrder = response?.data
        this.order = response?.data?.order
        this.adInfo = response?.data?.ad_info
        this.payInfo = response?.data?.payinfo[0]
      }
      await loader.dismiss()
    })
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }

  referToChatPage() {
    this.nav.navigateForward('p2p-chat', {
      queryParams: {
        name: this.adInfo?.name?.toUpperCase(),
        amount: this.formatNumber(this.adInfo?.fiat_qty),
        amountCurrency: this.adInfo?.fiat,
        orderStatus: this.adInfo?.status,
        orderID: this.order?.id
      }
    })
  }

}
