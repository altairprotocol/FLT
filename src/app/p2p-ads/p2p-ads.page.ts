import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-p2p-ads',
  templateUrl: './p2p-ads.page.html',
  styleUrls: ['./p2p-ads.page.scss'],
})
export class P2pAdsPage implements OnInit {
  adsList: any[]

  constructor(private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider) { }

  ngOnInit() {
    this.p2pAdsIndex()
  }

  async p2pAdsIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pMyAds().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ ConvertPage ~ this.exchangeProvider.convertIndex ~ response:", response)
      if (response?.status === 1) {
        this.adsList = response?.data?.myads
      }
      await loader.dismiss()
    })
  }

  back() {
    this.location.back()
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }

  formatDate(unix_timestamp) {
    const d = new Date(unix_timestamp * 1000);

    const addLeadingZero = (num) => num < 10 ? `0${num}` : num;

    const day = addLeadingZero(d.getDate());
    const month = addLeadingZero(d.getMonth() + 1);
    const year = d.getFullYear();
    const hours = addLeadingZero(d.getHours());
    const minutes = addLeadingZero(d.getMinutes());

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

}
