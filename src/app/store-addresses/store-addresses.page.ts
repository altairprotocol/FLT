import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-store-addresses',
  templateUrl: './store-addresses.page.html',
  styleUrls: ['./store-addresses.page.scss'],
})
export class StoreAddressesPage implements OnInit {

  constructor(private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private alertController: AlertController) { }
  addresses: any[] = null
  ngOnInit() {
    this.getStoreAddresses()
  }

  back() {
    this.location.back()
  }

  async getStoreAddresses() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.storeAddress().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.addresses = response?.data?.addresses
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  async confirmDeleteAddress(id: any) {
    const alert = await this.alertController.create({
      header: "Delete Address?",
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
            this.deleteAddress(id)
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteAddress(id: any) {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.storeDeleteAddress(id).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.getStoreAddresses()
          this.exchangeProvider.presentToast(response?.data)
        } else {
          this.exchangeProvider.presentToast(response?.data)
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  editAddress(id: any) {
    // TODO: EDIT Address
  }

}
