import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-otc-history',
  templateUrl: './otc-history.page.html',
  styleUrls: ['./otc-history.page.scss'],
})
export class OtcHistoryPage implements OnInit {
  listItems: any = null

  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.fetchOTCRecords()
  }

  back() {
    this.location.back()
  }

  async fetchOTCRecords() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.otcrecords().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      await loader.dismiss()
      console.log(response);
      if (response?.status === 1) {
        this.listItems = response?.data?.list
      }
    })
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
