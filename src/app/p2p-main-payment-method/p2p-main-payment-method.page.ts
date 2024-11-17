import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-p2p-main-payment-method',
  templateUrl: './p2p-main-payment-method.page.html',
  styleUrls: ['./p2p-main-payment-method.page.scss'],
})
export class P2pMainPaymentMethodPage implements OnInit {
  paymentMethods: any
  selectedPaymentMethod: any = null
  // onlyShow = true means that user wants to see the payment methods, false means user will be able to select payment methods and trade
  onlyShow: boolean = true
  constructor(private route: ActivatedRoute, private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) {
    this.route.queryParams.subscribe((params) => {
      this.onlyShow = params?.onlyShow ? params?.onlyShow : true
    });
  }

  ngOnInit() {
    this.paymentMethodsIndex()
  }

  async paymentMethodsIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    // @ts-ignore
    this.exchangeProvider.p2pPaymentSettings().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ P2pMainPaymentMethodPage ~ response:", response)
        if (response?.status === 1) {
          this.paymentMethods = response?.data?.user_methods
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  back() {
    this.location.back()
  }

  refer(path: string) {
    this.nav.navigateForward(path)
  }

}
