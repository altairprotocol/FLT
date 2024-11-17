import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-freeze',
  templateUrl: './freeze.page.html',
  styleUrls: ['./freeze.page.scss'],
})
export class FreezePage implements OnInit {

  email: string = null
  selectedReason: any = null
  showOtherReasonInput: boolean = false

  reasons: any[] = null
  otherReason: string = null

  constructor(private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private nav: NavController, private alertController: AlertController) { }

  ngOnInit() {
    this.freezeReasons()
  }

  back() {
    this.location.back()
  }

  setSelectedReason(reason: string) {
    this.selectedReason = reason
  }

  async freezeReasons() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.freezeReasons().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ GiftPage ~ this.exchangeProvider.TransferIndex ~ response:", response)
      if (response?.status === 1) {
        this.reasons = response?.data?.reason
      }
      await loader.dismiss()
    })
  }

  async confirmFreeze() {
    const alert = await this.alertController.create({
      header: "Confirm freezing ?",
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
          handler: () => {
            this.freeze()
          }
        }
      ]
    });
    await alert.present();
  }

  async freeze() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.doFreeze(this.selectedReason == 'Others' ? this.otherReason : this.selectedReason).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ GiftPage ~ this.exchangeProvider.TransferIndex ~ response:", response)
      if (response?.status === 1) {
        localStorage.clear()
        this.exchangeProvider.presentToast(response?.data)
        setTimeout(() => {
          this.nav.navigateRoot("/tabs/home")
        }, 2000);
      } else {
        this.exchangeProvider.presentToast(response?.data)
      }
      await loader.dismiss()
    })
  }
}
