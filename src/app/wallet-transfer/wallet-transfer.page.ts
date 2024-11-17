import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-wallet-transfer',
  templateUrl: './wallet-transfer.page.html',
  styleUrls: ['./wallet-transfer.page.scss'],
})
export class WalletTransferPage implements OnInit {
  fromAccount: string = null;
  toAccount: string = null;
  selectedCoin: string = null;
  baltypes: string[] = null
  amount: any = null
  coins: any[] = null
  availableBalance: any = null
  amountCorrect: boolean = false;

  constructor(private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.transferIndex()
  }

  refer(path: string) {
    this.nav.navigateForward(path)
  }

  back() {
    this.location.back()
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }

  getAvailableBalance() {
    this.availableBalance = this.formatNumber(this.coins[this.selectedCoin]?.balance)
  }

  async transferIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.TransferIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ GiftPage ~ this.exchangeProvider.TransferIndex ~ response:", response)
      if (response?.status === 1) {
        this.coins = response?.data?.coins;
        this.fromAccount = response?.data?.from;
        this.toAccount = response?.data?.to;
        this.baltypes = response?.data?.baltypes;
        this.availableBalance = this.formatNumber(this.coins[this.selectedCoin]?.balance)
      }
      await loader.dismiss()
    })
  }

  amountCorrectCheck() {

    let available = this.formatNumber(this.coins[this.selectedCoin]?.balance);
    if (this.amount == undefined || this.amount == null || this.amount === 0) {
      this.amountCorrect = false
      return
    }
    if (available <= this.amount) {
      this.amountCorrect = false
    } else {
      this.amountCorrect = true
    }
  }

  async walletTransfer() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.doTransfer(this.fromAccount, this.toAccount, this.selectedCoin, this.amount).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ GiftPage ~ this.exchangeProvider.TransferIndex ~ response:", response)
      if (response?.status === 0) {
        this.exchangeProvider.presentToast(response?.data)
      } else {
        this.amount = null;
        this.exchangeProvider.presentToast(response?.data)
      }
      await loader.dismiss()
    })
  }

  swapFromTo() {
    let reserve = this.toAccount
    this.toAccount = this.fromAccount
    this.fromAccount = reserve
  }


}
