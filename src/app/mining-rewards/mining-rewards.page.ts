import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-mining-rewards',
  templateUrl: './mining-rewards.page.html',
  styleUrls: ['./mining-rewards.page.scss'],
})
export class MiningRewardsPage implements OnInit {
  miningRewardsList: any = null
  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getMiningRewards()
  }

  back() {
    this.location.back()
  }

  async getMiningRewards() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.miningRewards().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      if (response?.status === 1) {
        this.miningRewardsList = response?.data?.list
      }
      await loader.dismiss()
    })
  }

}
