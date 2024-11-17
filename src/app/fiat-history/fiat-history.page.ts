import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, MenuController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fiat-history',
  templateUrl: './fiat-history.page.html',
  styleUrls: ['./fiat-history.page.scss'],
})
export class FiatHistoryPage implements OnInit {
  selectcoin: any;
  cointype: any;
  info: any;
  deposits: any;
  transactions: any;
  activeSegment: any = 'deposits';
  withdrawals: any;

  constructor(private location: Location,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    private exchangeProvider: ExchangeProvider,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.selectcoin = params.coin;
      this.cointype = params.type;
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

  async getDeposits(selectedcoin: string) {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...'
    });


    this.exchangeProvider.fiatdeposithistory(selectedcoin)
      .subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        this.deposits = this.info.data.list;

      }, error => {
        console.log(error);
        alert.dismiss()
          .then()
          .catch(iError => {
            console.log(iError);
          });
      });

  }

  deposit_detail(id) {
    this.navCtrl.navigateForward('/deposit-info', {
      queryParams: { id, coin: this.selectcoin },
    });
  }

  async cancelout(id) {
    //cancelFiatOut
    const alert = await this.loadingCtrl.create({
      message: 'Loading...'
    });


    this.exchangeProvider.cancelFiatOut(id)
      .subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        console.log(this.info);
        this.getWithdrawals(this.selectcoin);
        this.exchangeProvider.presentToast(this.info.data);

      }, error => {
        console.log(error);
        alert.dismiss()
          .then()
          .catch(iError => {
            console.log(iError);
          });
      });
  }

  async getWithdrawals(selectedcoin: string) {
    const alert = await this.loadingCtrl.create({
      message: 'Loading...'
    });


    this.exchangeProvider.fiatoutlog(selectedcoin)
      .subscribe(data => {
        this.info = JSON.parse(JSON.stringify(data as any[]));
        this.withdrawals = this.info.data.list;
        alert.dismiss();

      }, error => {
        console.log(error);
        alert.dismiss()
          .then()
          .catch(iError => {
            console.log(iError);
          });
      });

  }

  segmentChanged(ev: any) {
    this.activeSegment = ev.detail.value;
  }

  withdraw_detail(withdrawal) {
    const send_tx = {
      mum: withdrawal?.num,
      coinname: withdrawal?.coin,
      username: withdrawal?.truename,
      txid: withdrawal?.txid,
      bankcard: withdrawal?.bankcard,
      status: withdrawal?.status,
      addtime: withdrawal?.addtime,
    };
    this.navCtrl.navigateForward(['/withdrawal-info'], { queryParams: send_tx });
  }

  doRefresh(event) {
    this.getDeposits(this.selectcoin);
    this.getWithdrawals(this.selectcoin);
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
