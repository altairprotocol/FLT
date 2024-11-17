import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { strongPasswordRegex } from 'src/utils/regex';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lab-ico',
  templateUrl: './lab-ico.page.html',
  styleUrls: ['./lab-ico.page.scss'],
})
export class LabIcoPage implements OnInit {
  amount: number;
  password: string;
  amountValid: boolean = false;
  passwordValid: boolean;
  currency: string = null;

  id: any = null
  coins: any = null
  beginTime: any = null
  endTime: any = null
  name: any = null

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Alert canceled');
      },
    },
    {
      text: 'I Understand',
      role: 'confirm',
      handler: () => {
        this.subscribeICO()
      },
    },
  ];

  constructor(private route: ActivatedRoute, private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private nav: NavController) {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        console.log(params?.beginTime, params?.endTime);

        this.id = params?.id ? params?.id : null;
        this.coins = params?.coins ? JSON.parse(params?.coins) : null;
        this.beginTime = params?.beginTime ? params?.beginTime : null;
        this.endTime = params?.endTime ? params?.endTime : null;
        this.name = params?.name ? params?.name : null;

        console.log(this.coins);

        console.log(this.beginTime, this.endTime);

      }

    });
  }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

  async subscribeICO() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.icoDoBuy(this.id, this.amount, this.password, this.currency).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.exchangeProvider.presentToast(response?.data)
          this.nav.navigateForward('lab-history')
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

  onAmount() {
    this.amountValid = true;
  }

  onPassword() {
    // const result = this.password.match(strongPasswordRegex)
    const result = true
    if (result) {
      this.passwordValid = true
      return
    }
    this.passwordValid = false
  }

  setResult(ev) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }

}
