import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-lab-history',
  templateUrl: './lab-history.page.html',
  styleUrls: ['./lab-history.page.scss'],
})
export class LabHistoryPage implements OnInit {
  icoLogsList: any = null
  constructor(private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private nav: NavController) { }

  ngOnInit() {
    this.icoLogs()
  }

  back() {
    this.location.back()
  }

  async icoLogs() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.icoLogs().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.icoLogsList = response?.data?.list
          await loader.dismiss()
        }
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
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
    if (!float) return
    return parseFloat(float)
  }

}
