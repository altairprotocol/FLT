import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-p2p-faq',
  templateUrl: './p2p-faq.page.html',
  styleUrls: ['./p2p-faq.page.scss'],
})
export class P2pFaqPage implements OnInit {

  faqs: any[] = []

  constructor(private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider) { }

  ngOnInit() {
    this.p2pFaqsIndex()
  }

  async p2pFaqsIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pFaq().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ ConvertPage ~ this.exchangeProvider.convertIndex ~ response:", response)
      if (response?.status === 1) {
        this.faqs = response?.data?.list
      }
      await loader.dismiss()
    })
  }

  back() {
    this.location.back()
  }

  doRefresh(event) {
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
