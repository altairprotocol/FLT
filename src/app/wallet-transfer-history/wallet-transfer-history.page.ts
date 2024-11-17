import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-wallet-transfer-history',
  templateUrl: './wallet-transfer-history.page.html',
  styleUrls: ['./wallet-transfer-history.page.scss'],
})
export class WalletTransferHistoryPage implements OnInit {
  history: any = null
  filteredHistory: any = null
  selectedCoin: string = 'all';
  coins: any[] = null

  constructor(private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.transferHistory()
    this.transferIndex()
  }

  back() {
    this.location.back()
  }

  filterHistory() {
    if (this.selectedCoin == 'all') {
      this.filteredHistory = this.history;
    } else {
      this.filteredHistory = this.history.filter((item) => item?.coin === this.selectedCoin)
    }
  }

  async transferHistory() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.walletTransferHistory().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      if (response?.status === 1) {
        this.history = response?.data?.transfers
        this.filteredHistory = response?.data?.transfers
      }
      await loader.dismiss()
    })
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

  formatNumber(float: any) {
    if (float === null || float === undefined) return '';
    const num = parseFloat(float);
    if (isNaN(num)) return '';
    const str = num.toFixed(10);
    return str.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '').replace(/\.0+$/, '');
  }

  async transferIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.TransferIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ GiftPage ~ this.exchangeProvider.TransferIndex ~ response:", response)
      if (response?.status === 0) {
        this.coins = response?.data?.coins;
      }
      await loader.dismiss()
    })
  }

}
