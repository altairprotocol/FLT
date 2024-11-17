import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-p2p-payment-settings',
  templateUrl: './p2p-payment-settings.page.html',
  styleUrls: ['./p2p-payment-settings.page.scss'],
})
export class P2pPaymentSettingsPage implements OnInit {
  paymentMethods: any = null

  constructor(private location: Location, private nav: NavController, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private alertController: AlertController) { }

  ngOnInit() {
    this.paymentMethodsIndex()
  }

  back() {
    this.location.back()
  }

  referTo(path: string) {
    this.nav.navigateForward(path)
  }

  async paymentMethodsIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    // @ts-ignore
    this.exchangeProvider.p2pPaymentSettings().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ P2pMainPaymentMethodPage ~ response:", response)
        if (response?.status === 1) {
          this.paymentMethods = response?.data?.UserBank
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  async confirmDelete(id: any) {
    const alert = await this.alertController.create({
      header: "Are you sure?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: async () => {
            this.deleteBank(id)
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteBank(id: any) {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    // @ts-ignore
    this.exchangeProvider.p2pDelBank(id).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ P2pMainPaymentMethodPage ~ response:", response)
        if (response?.status === 1) {
          this.exchangeProvider.presentToast(response?.data)
          this.paymentMethodsIndex()
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

  editBank(method: any) {
    this.nav.navigateForward('/p2p-payment-method-new', {
      queryParams: { paymentMethod: 'bank', bankName: method?.bank, bankAccountNumber: method?.bankcard, ifscCode: method?.bankaddr },
    });
  }

}
