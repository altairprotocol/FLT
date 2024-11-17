import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-anti-fishing',
  templateUrl: './anti-fishing.page.html',
  styleUrls: ['./anti-fishing.page.scss'],
})
export class AntiFishingPage implements OnInit {
  oldAntiFishingCode: any = null
  antiFishingCode: any = null
  antiFishingCodeCorrect: boolean = false
  constructor(private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider) { }

  back() {
    this.location.back()
  }

  ngOnInit() {
    this.antiFishingIndex()
  }

  validateCode() {
    this.antiFishingCode = this.antiFishingCode.replace(/[^a-zA-Z0-9]+/g, '');
    console.log(this.antiFishingCode.length <= 4, this.antiFishingCode.length > 15);

    if (this.antiFishingCode.length < 5) {
      return this.antiFishingCodeCorrect = false
    }

    if (this.antiFishingCode.length > 15) {
      return this.antiFishingCodeCorrect = false
    }

    return this.antiFishingCodeCorrect = true
  }

  async antiFishingIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.antiFishingIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ AntiFishingPage ~ this.exchangeProvider.updateAntiFishing ~ response:", response)
      if (response?.status === 1) {
        this.oldAntiFishingCode = response?.data?.antiphishing;
      } else {
        this.exchangeProvider.presentToast(response?.data)
      }
      await loader.dismiss()
    })
  }

  async setAntiFishingCode() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.updateAntiFishing(this.antiFishingCode).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ AntiFishingPage ~ this.exchangeProvider.updateAntiFishing ~ response:", response)
      if (response?.status === 1) {
        this.exchangeProvider.presentToast(response?.data)
        this.antiFishingIndex()
      } else {
        this.exchangeProvider.presentToast(response?.data)
      }
      await loader.dismiss()
    })
  }

}
