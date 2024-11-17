import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.page.html',
  styleUrls: ['./lab.page.scss'],
})
export class LabPage implements OnInit {
  activeSegment: string = 'Live';
  icoList: any = null

  constructor(private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider, private nav: NavController) { }

  ngOnInit() {
    this.icoIndex()
  }

  back() {
    this.location.back()
  }

  referToICOInfoPage(id: any) {
    this.nav.navigateForward('/lab-info', {
      queryParams: { id },
    });
  }

  refer(path: string) {
    this.nav.navigateForward(path);
  }

  async icoIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.icoIndex().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.icoList = response?.data
          await loader.dismiss()
        }
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

  changeSegment(segment: string) {
    this.activeSegment = segment
  }

}
