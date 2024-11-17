import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-p2p-buy-pay',
  templateUrl: './p2p-buy-pay.page.html',
  styleUrls: ['./p2p-buy-pay.page.scss'],
})
export class P2pBuyPayPage implements OnInit {
  paymentStatus: number = 0;
  isBuying: boolean = true;
  adData: any = null
  quantity: any = null
  payMethods: any = null
  // 0 = Init
  // 1 = Paying Now
  // 2 = Paid
  // 3 = Cancelled
  constructor(private route: ActivatedRoute, private location: Location, private alert: AlertController, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) {
    this.route.queryParams.subscribe((params) => {
      this.isBuying = params?.isBuying == true || params?.isBuying == 'true' ? true : false;
      this.adData = params?.adData ? JSON.parse(params?.adData) : null
      this.quantity = params?.quantity ? params.quantity : null
      if (this.adData?.key) {
        this.adData = this.adData?.value
      }
      try {
        this.payMethods = this.adData?.pay_methods
        this.payMethods = JSON.parse(this.adData?.pay_methods || '[]');
      } catch (e) {
        this.payMethods = [];
      }
      console.log(this.adData, this.quantity);

    });

  }


  public alertButtons = [
    {
      text: 'Go back',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Pay Now',
      role: 'confirm',
      handler: () => {
        this.paymentStatus = 1
      },
    },
  ];

  public confirmReceivedPaymentButtons = [
    {
      text: 'Go back',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'Got Payment',
      role: 'confirm',
      handler: () => {
        this.paymentStatus = 1
      },
    },
  ];


  ngOnInit() {
  }

  back() {
    this.location.back()
  }

  async confirmPayNow() {
    const alert = await this.alert.create({
      header: 'Confirmation',
      message: `To avoid restrictions on your P2P account, please Ensure payments are made from account that matches your registered name as ${this.adData?.name?.toUpperCase()}`,
      buttons: this.alertButtons,
    });

    await alert.present();
  }

  async confirmGotPayment() {
    const alert = await this.alert.create({
      header: 'Confirmation',
      message: `Please make sure that you have received ${this.adData?.fixed_price * this.quantity + ' ' + this.adData?.fiat} from ${this.adData?.name?.toUpperCase()}`,
      buttons: this.confirmReceivedPaymentButtons,
    });

    await alert.present();
  }

  paymentCompleted() {
    this.paymentStatus = 2
  }

  referTo(url: string) {
    this.nav.navigateRoot(url)
  }

  referToChatPage() {
    console.log("do");

    this.nav.navigateForward('p2p-chat', {
      queryParams: {
        name: this.adData?.name?.toUpperCase(),
        amount: this.adData?.fixed_price * this.quantity,
        amountCurrency: this.adData?.fiat,
        orderStatus: 0,
        orderID: this.adData?.orderid
      }
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

  referToCancelOrder() {
    this.nav.navigateForward('p2p-buy-pay-cancel', {
      queryParams: {
        id: this.adData?.orderid,
      }
    })
  }

}
