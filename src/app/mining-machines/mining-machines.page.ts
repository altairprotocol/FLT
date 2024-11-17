import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-mining-machines',
  templateUrl: './mining-machines.page.html',
  styleUrls: ['./mining-machines.page.scss'],
})
export class MiningMachinesPage implements OnInit {
  miningMachines: any = null
  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private navController: NavController) {

  }

  ngOnInit() {
    this.getMiningMachines()
  }

  back() {
    this.location.back()
  }

  refer(path: string) {
    this.navController.navigateForward(path)
  }

  startMiningMachine(id: any) {
    // this.exchangeProvider.presentToast("Coming soon")
    // return
    this.exchangeProvider.miningStartMachine(id).subscribe((data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      this.exchangeProvider.presentToast(response?.data)
      if (response.status === 1) {
        this.getMiningMachines()
      }
    })
  }


  getMiningMachines() {
    this.exchangeProvider.miningMachines().subscribe((data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      if (response?.status === 1) {
        this.miningMachines = response?.data?.list
      }
    })
  }

}
