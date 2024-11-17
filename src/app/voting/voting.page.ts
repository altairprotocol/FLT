import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {
  // @ts-ignore
  votingItems: { [key: string]: any } = null;
  exchangeURL: string = environment.exchangeUrl
  loaded: boolean = false

  constructor(private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private alertController: AlertController) {

    console.log('VotingPage constructor called');
  }

  ngOnInit() {
    console.log(" I ran");
    this.votingIndex()
  }

  async votingIndex() {
    // let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    // await loader.present()
    // @ts-ignore
    this.exchangeProvider.votingIndex().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        if (response?.status === 1) {
          this.votingItems = response?.data?.list
          console.log(this.votingItems);
        }
        this.loaded = true
        // await loader.dismiss()
      },
      async (error) => {
        // await loader.dismiss()
        this.loaded = true
        console.log(error)
      }
    )
  }

  refer(path: string) {
    if (!path) return
    this.nav.navigateForward(path)
  }

  back() {
    this.location.back()
  }

  async upvote(id: string) {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.votingUp(1, Number(id)).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ VotingPage ~ upvote ~ response:", response)
        if (response?.status === 0) {
          this.exchangeProvider.presentToast(response?.data)
        } else {
          this.exchangeProvider.presentToast(response?.data)
        }
        await loader.dismiss()
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

  async downvote(id: string) {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.votingUp(2, Number(id)).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ VotingPage ~ downvote ~ response:", response)
        if (response?.status === 0) {
          this.exchangeProvider.presentToast(response?.data)
        } else {
          this.exchangeProvider.presentToast(response?.data)
        }
        await loader.dismiss()
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

  getBarPercentages(base, total) {
    return Math.round(base / total * 100)
  }

  getBarPercentagesString(base, total) {
    return `${Math.round(base / total * 100)}%`
  }

  async confirmAction(amount: any, currency: any, id: any, type: number /* type === 1 means upvote else downvote */) {
    const alert = await this.alertController.create({
      header: "Voting Price",
      subHeader: `Voting will cost ${amount} ${currency}. Continue ?`,
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
          handler: (data) => {
            if (type === 1) {
              this.upvote(id)
            } else {
              this.downvote(id)
            }
            console.log('Confirm clicked', data);
          }
        }
      ]
    });
    await alert.present();
  }

}
