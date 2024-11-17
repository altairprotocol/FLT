import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-airdrop',
  templateUrl: './airdrop.page.html',
  styleUrls: ['./airdrop.page.scss'],
})
export class AirdropPage implements OnInit {
  activeSegment: string = 'Live';
  airdrops: any = null

  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getAirdropIndex()
  }

  changeSegment(segment: string) {
    this.activeSegment = segment
  }

  back() {
    this.location.back()
  }

  async getAirdropIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.airdropIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      if (response?.status === 1) {
        this.airdrops = response?.data
      }
      await loader.dismiss()
    })
  }

}
