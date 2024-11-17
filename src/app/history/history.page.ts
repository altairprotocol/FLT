import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  info: any;
  deposits: any;
  transactions: any;
  selectcoin: any;
  cointype: any;
  tabtype: any;
  withdrawals: any;
  activeSegment: string = 'deposits';

  constructor(private location: Location,
    private nav: NavController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private exchangeProvider: ExchangeProvider,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectcoin = params.coin;
      this.cointype = params.type;
      this.tabtype = params.tabtype;
    });
    if (!this.selectcoin) {
      this.selectcoin = 0;
    }
    this.getDeposits(this.selectcoin);
    this.getWithdrawals(this.selectcoin);
  }

  back() {
    this.location.back();
  }

  async getDeposits(selectedcoin) {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    await alert.present();

    this.exchangeProvider.exchange_deposits(selectedcoin).subscribe(
      (data) => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        alert.dismiss();
        this.deposits = this.info.data;
      },
      (error) => {
        alert
          .dismiss()
          .then()
          .catch((iError) => { });
      }
    );
  }

  async getWithdrawals(selectedcoin: string) {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    await alert.present();
    this.exchangeProvider.exchange_withdrawals(selectedcoin).subscribe(
      (data) => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        alert.dismiss();
        this.withdrawals = this.info.data;
      },
      (error) => {
        alert
          .dismiss()
          .then()
          .catch((iError) => { });
      }
    );
  }

  segmentChanged(ev: any) {
    this.activeSegment = ev.detail.value;
  }

  deposit_detail(deposit) {
    const send_tx = {
      username: deposit.username,
      dest_tag: deposit.dest_tag,
      coinname: deposit.coinname,
      network: deposit.network,
      txid: deposit.txid,
      fee: deposit.fee,
      mum: deposit.mum,
      addtime: deposit.addtime,
      status: deposit.status,
    };

    this.nav.navigateForward(['/deposit-detail'], { queryParams: send_tx });
  }

  withdraw_detail(transaction) {
    const send_tx = {
      username: transaction.username,
      dest_tag: transaction.dest_tag,
      coinname: transaction.coinname,
      network: transaction.network,
      txid: transaction.txid,
      fee: transaction.fee,
      mum: transaction.mum,
      addtime: transaction.addtime,
      status: transaction.status,
    };
    this.nav.navigateForward(['/withdrawal-detail'], { queryParams: send_tx });
  }

  doRefresh(event) {
    this.getDeposits(this.selectcoin);
    this.getWithdrawals(this.selectcoin);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
