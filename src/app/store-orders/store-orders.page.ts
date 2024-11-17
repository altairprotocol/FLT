import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-store-orders',
  templateUrl: './store-orders.page.html',
  styleUrls: ['./store-orders.page.scss'],
})
export class StoreOrdersPage implements OnInit {
  orders: any[] = null
  constructor(private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private alertController: AlertController) { }

  ngOnInit() {
    this.storeOrders()
  }

  async storeOrders() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.storeOrders().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.orders = response?.data?.list
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
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

  async confirmCancelOrder(id: any) {
    const alert = await this.alertController.create({
      header: "Cancel Order?",
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
            this.cancelOrder(id)
          }
        }
      ]
    });
    await alert.present();
  }

  async cancelOrder(id: any) {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.storeCancelOrder(id).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.exchangeProvider.presentToast(response?.data)
          this.ngOnInit()
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

  back() {
    this.location.back()
  }

  referToStorePage(id) {
    this.nav.navigateForward('store-buy', {
      queryParams: { id }
    })
  }

}
