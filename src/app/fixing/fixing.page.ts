import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-fixing',
  templateUrl: './fixing.page.html',
  styleUrls: ['./fixing.page.scss'],
})
export class FixingPage implements OnInit {
  stakingItems: any[] = null
  selectedDurations: object = {}
  loaded: boolean = false
  constructor(private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private alertController: AlertController, private loadingCtrl: LoadingController) { }

  async ngOnInit() {
    this.exchangeProvider.stakingIndex().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.stakingItems = response?.data?.list
        }
        if (response?.status === -99) {
          localStorage.clear();
  
          this.nav.navigateRoot('login2');
          
        }
        this.loaded = true
      },
      async (error) => {
        this.loaded = true
        console.log(error)
      }
    )
  }

  stake() {
    console.log("Stake now");
  }

  refer(path: string) {
    if (!path) return
    this.nav.navigateForward(path)
  }

  back() {
    this.location.back()
  }

  async createStaking(id, amount, period) {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.stakingCreate(id, amount, period).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        await loader.dismiss()
        if (response?.status === 0) {
          this.exchangeProvider.presentToast(response?.data)
        } else {
          if (typeof response?.data === 'string') {
            this.exchangeProvider.presentToast(response?.data)
          }
        }
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  async confirmStake(id: any) {
    const period = this.selectedDurations[id];
    if (!period) {
      return this.exchangeProvider.presentToast("Please select a period first")
    }
    const currentStake = this.stakingItems.filter((item) => item.id === id)[0]
    console.log("🚀 ~ FixingPage ~ confirmStake ~ currentStake:", currentStake)
    const alert = await this.alertController.create({
      header: currentStake.title,
      inputs: [
        {
          name: 'amount',
          type: 'number',
          placeholder: 'Please enter amount',
          id: 'amount-input'
        },
      ],
      buttons: [
        {
          text: 'Max Amount',
          handler: (data) => {
            const maxAmount = Number(currentStake?.maxvest);
            const amountInput = document.getElementById('amount-input') as HTMLInputElement;
            if (amountInput) {
              amountInput.value = maxAmount.toString();
              const event = new Event('input', { bubbles: true, cancelable: true });
              amountInput.dispatchEvent(event);
            }

            return false;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirm',
          handler: (data) => {
            console.log('Confirm clicked', data);
            console.log("🚀 ~ FixingPage ~ confirmStake ~ period:", id, period, data?.amount)
            this.createStaking(id, data?.amount, period)
          }
        }
      ]
    });
    await alert.present();

  }

  getLargestReturn(obj: object) {
    const largestKey = Math.max(...Object.keys(obj).map(Number));
    return `${obj[largestKey]}%`;
  }

  setDuration(period, id) {
    this.selectedDurations[id] = period
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }
}
