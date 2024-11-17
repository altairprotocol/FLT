import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { strongPasswordRegex } from 'src/utils/regex';
import { countries as AllCountries } from '../auth/personal-details/countries';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-store-new-address',
  templateUrl: './store-new-address.page.html',
  styleUrls: ['./store-new-address.page.scss'],
})
export class StoreNewAddressPage implements OnInit {

  addressTitle: string = null;
  contactName: string = null;
  contactNumber: string = null;
  region: string = 'af';
  city: string = null;
  shippingAddress: string = null;
  fundPassword: string;
  fundPasswordValid: boolean;
  countries = AllCountries;

  constructor(private location: Location, private nav: NavController, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider) { }

  ngOnInit() {
  }

  back() {
    this.location.back()
  }

  onPassword() {
    const result = this.fundPassword.match(strongPasswordRegex)
    if (result) {
      this.fundPasswordValid = true
      return
    }
    this.fundPasswordValid = false
  }

  async createAddress() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.storeAddressCreate(this.contactName, this.contactNumber, this.shippingAddress, this.city).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 0) {
          this.exchangeProvider.presentToast(response?.data)
        } else {
          this.exchangeProvider.presentToast(response?.data)
          this.location.back()
        }
      },
      async (error) => {
        console.log(error)
      }
    )
  }

}
