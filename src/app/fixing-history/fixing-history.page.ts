import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-fixing-history',
  templateUrl: './fixing-history.page.html',
  styleUrls: ['./fixing-history.page.scss'],
})
export class FixingHistoryPage implements OnInit {
  stakingItems: any = null;
  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private alertController: AlertController) { }

  async ngOnInit() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.stakingLog().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        if (response?.status === 1) {
          this.stakingItems = response?.data?.list
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  async confirmWithdraw(docID: any, item: any) {
    let header = null;
    if (item?.allow_withdrawal == "0") {
      return this.exchangeProvider.presentToast("This record will be processed upon maturity!")
    } else {
      if (item?.penalty_amount > 0) {
        header = `It would cost ${this.formatNumber(item?.penalty_amount)} ${item?.penalty_coin?.toUpperCase()}`
      } else {
        header = "Are you sure to cancel it?"
      }
    }
    const alert = await this.alertController.create({
      header: item?.allow_withdraw == "0" ? `` : "Confirm Withdraw?",
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
            this.stakingWithdraw(docID)
          }
        }
      ]
    });
    await alert.present();
  }

  async stakingWithdraw(docID: any) {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.stakingWithdraw(docID).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingHistoryPage ~ response:", response)
        if (response?.status === 1) {
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

  back() {
    this.location.back()
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

}
