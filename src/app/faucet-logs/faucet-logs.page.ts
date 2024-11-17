import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { LoadingController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-faucet-logs',
  templateUrl: './faucet-logs.page.html',
  styleUrls: ['./faucet-logs.page.scss'],
})
export class FaucetLogsPage implements OnInit {
  faucetLogs: any = null
  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getFaucetLogsIndex()
  }

  async getFaucetLogsIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.faucetLogs().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ FaucetLogsPage ~ this.exchangeProvider.faucetLogs ~ response:", response)
      if (response?.status === 1) {
        this.faucetLogs = response?.data?.list
      }
      await loader.dismiss()
    })
  }

  async getFaucetClaimLogs() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.faucetClaimLogs().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ FaucetLogsPage ~ this.exchangeProvider.faucetLogs ~ response:", response)
      if (response?.status === 1) {
        // this.faucetLogs = response?.data?.list
      }
      await loader.dismiss()
    })
  }


  back() {
    this.location.back()
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
