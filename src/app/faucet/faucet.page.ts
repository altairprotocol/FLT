import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-faucet',
  templateUrl: './faucet.page.html',
  styleUrls: ['./faucet.page.scss'],
})
export class FaucetPage implements OnInit {

  activeSegment: string = 'Live';
  faucets: any = null

  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private nav: NavController) { }

  ngOnInit() {
    this.getFaucetIndex()
  }

  changeSegment(segment: string) {
    this.activeSegment = segment
  }

  back() {
    this.location.back()
  }

  async getFaucetIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.faucetIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      if (response?.status === 1) {
        this.faucets = response?.data
      }
      await loader.dismiss()
    })
  }

  refer(path: string) {
    this.nav.navigateForward(path)
  }

  async claimFaucet(id: any) {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.faucetClaim(id).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ FaucetPage ~ this.exchangeProvider.faucetClaim ~ response:", response)
      if (response?.status === 1) {
        this.exchangeProvider.presentToast(response?.data)
      } else {
        this.exchangeProvider.presentToast(response?.data)
      }
      await loader.dismiss()
    })
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
