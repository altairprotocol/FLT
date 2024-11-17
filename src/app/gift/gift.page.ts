import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-gift',
  templateUrl: './gift.page.html',
  styleUrls: ['./gift.page.scss'],
})
export class GiftPage implements OnInit {
  activeGiftSegment: string = 'Send'
  activeRedeemSegment: string = 'Check Value'
  mainCoin: string = "btc";
  sendAmount: number
  amountCorrect: boolean = false
  nonce: number = null;

  giftCardBalance: any = null

  giftPublicCode: string = null;
  giftSecretCode: string = null;

  giftAllCards: any = null;
  giftMyCards: any = null;
  giftSpentCards: any = null;
  indexCoins: any[] = null
  from: string = "spot";
  to: string = "p2p";


  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private alertController: AlertController) { }


  ngOnInit() {
    this.init()
  }

  async init() {
    this.giftCardTemplateIndex()
    this.giftIndex()
    // this.transferIndex()
  }

  async giftCardTemplateIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.giftcardTemplateIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      this.indexCoins = response?.data?.coins;
      this.nonce = response?.data?.nonce;
      await loader.dismiss()
    })
  }



  async giftIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.giftIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      if (response?.status === 1) {
        this.giftAllCards = response?.data;
        this.giftSpentCards = response?.data?.spentcards;
        this.giftMyCards = response?.data?.mycards;
      }
      await loader.dismiss()
    })
  }

  async transferIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.TransferIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ GiftPage ~ this.exchangeProvider.TransferIndex ~ response:", response)
      if (response?.status === 0) {
        this.indexCoins = response?.data?.coins;
        this.from = response?.data?.from;
        this.to = response?.data?.to;
      }
      await loader.dismiss()
    })
  }

  back() {
    this.location.back()
  }

  changeGiftSegment(segment: string) {
    this.activeGiftSegment = segment
  }

  changeRedeemSegment(segment: string) {
    this.activeRedeemSegment = segment
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }

  amountCorrectCheck() {
    console.log(this.sendAmount);

    let available = this.formatNumber(this.indexCoins[this.mainCoin]?.balance);
    if (this.sendAmount == undefined || this.sendAmount == null || this.sendAmount === 0) {
      this.amountCorrect = false
      return
    }
    if (available <= this.sendAmount) {
      this.amountCorrect = false
    } else {
      this.amountCorrect = true
    }
  }

  async transfer() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.giftCreate(this.mainCoin, this.sendAmount, 1, this.nonce).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log(response);
      if (response?.status === 1) {
        this.exchangeProvider.presentToast(response?.data)
      } else {
        this.exchangeProvider.presentToast(response?.data)
      }
      this.sendAmount = null;
      this.giftIndex()
      this.giftCardTemplateIndex()
      await loader.dismiss()
    })
  }

  giftCheck() {
    this.exchangeProvider.giftCheck(this.giftPublicCode).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log(response);
      if (response?.status == 1) {
        this.giftCardBalance = response?.amount + ' ' + response?.coin
        this.exchangeProvider.presentToast(response?.msg ? response.msg : response?.data)
      } else {
        this.exchangeProvider.presentToast(response?.msg ? response.msg : response?.data)
      }
    })
  }

  async giftRedeem(public_code = null, secret_code = null) {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    if (!public_code) {
      public_code = this.giftPublicCode
    }
    if (!secret_code) {
      secret_code = this.giftSecretCode
    }
    this.exchangeProvider.giftRedeem(public_code, secret_code).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log(response);
      if (response?.status === 1) {
        this.exchangeProvider.presentToast(response?.data)
        this.init()
      } else {
        this.exchangeProvider.presentToast(response?.data)
      }
      await loader.dismiss()
    })
  }

  async showGiftInfo(data: any, spent: boolean = false) {
    const alert = await this.alertController.create({
      header: `Value: ${this.formatNumber(data?.value)} ${data?.coin?.toUpperCase()}`,
      subHeader: `Public Code: ${data?.public_code}`,
      message: `Private Code: ${data?.secret_code}`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Redeem',
          handler: (local_data) => {
            if (spent) {
              return this.exchangeProvider.presentToast("Already spent!")
            }
            this.giftRedeem(data?.public_code, data?.secret_code)
            console.log('Confirm clicked', local_data);

          }
        }
      ]
    });

    await alert.present();
  }

}
