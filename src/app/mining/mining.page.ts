import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.page.html',
  styleUrls: ['./mining.page.scss'],
})
export class MiningPage implements OnInit {

  miningIndexList: any = null
  constructor(private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private alertController: AlertController, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.getMiningIndex()
  }

  back() {
    this.location.back()
  }

  refer(path: string) {
    this.nav.navigateForward(path);
  }

  async getMiningIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.miningIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      if (response?.status === 1) {
        this.miningIndexList = response?.data?.list
      }
      await loader.dismiss()
    })
  }

  // getMiningMachines() {
  //   this.exchangeProvider.miningMachines().subscribe((data) => {
  //     let response = JSON.parse(JSON.stringify(data as any[]));
  //     console.log(response);
  //   })
  // }

  // getMiningRewards() {
  //   this.exchangeProvider.miningRewards().subscribe((data) => {
  //     let response = JSON.parse(JSON.stringify(data as any[]));
  //     console.log(response);
  //   })
  // }

  async confirmRentPurchase(id: any) {
    const alert = await this.alertController.create({
      header: "Confirm Purchase?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: async () => {
            //TODO: Change 0 to actual amount. Currently getting `Quantity wrong format` error in api response
            this.rentMiningMachine(1, id)
          }
        }
      ]
    });
    await alert.present();
  }

  async rentMiningMachine(num: any, id: any) {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.miningRentMachine(num, id).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      if (response?.status === 0) {
        this.exchangeProvider.presentToast(response?.data)
      }
      if (response?.status === 1) {
        this.exchangeProvider.presentToast(response?.data)
      }
      await loader.dismiss()
    })
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }

}
