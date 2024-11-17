import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lab-info',
  templateUrl: './lab-info.page.html',
  styleUrls: ['./lab-info.page.scss'],
})
export class LabInfoPage implements OnInit {
  id: any = null
  convertPrice: any = null
  kyced: any = null
  icoIssue: any = null
  coins: any = null
  constructor(private route: ActivatedRoute, private location: Location, private nav: NavController, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider) {
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.id = params?.id ? params?.id : null;
      }

    });
  }

  ngOnInit() {
    this.icoView()
  }

  back() {
    this.location.back()
  }

  async icoView() {
    if (!this.id) {
      return
    }
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.icoView(this.id).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.convertPrice = response?.data?.convert_price
          this.kyced = response?.data?.kyced
          this.icoIssue = response?.data?.issue
          this.coins = response?.data?.show_coins
          await loader.dismiss()
        }
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

  referToICOBuyPage() {
    this.nav.navigateForward('/lab-ico', {
      queryParams: { id: this.id, coins: JSON.stringify(this.coins), beginTime: this.icoIssue?.time, endTime: this.icoIssue?.endtime, name: this.icoIssue?.name },
    });
  }

  refer(path: string) {
    this.nav.navigateForward(path);
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }

}

