import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-voting-info',
  templateUrl: './voting-info.page.html',
  styleUrls: ['./voting-info.page.scss'],
})
export class VotingInfoPage implements OnInit {
  votingItems: any[] = null;

  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.votingInfoIndex()
  }

  async votingInfoIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.votingLog().subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        if (response?.status === 1) {
          this.votingItems = response?.data?.list
          console.log(this.votingItems);
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  convertTimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  back() {
    this.location.back()
  }

}
