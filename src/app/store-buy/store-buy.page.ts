import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { strongPasswordRegex } from 'src/utils/regex';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-store-buy',
  templateUrl: './store-buy.page.html',
  styleUrls: ['./store-buy.page.scss'],
})
export class StoreBuyPage implements OnInit {
  quantity: number = 1;
  password: string;
  quantityValid: boolean = false;
  passwordValid: boolean;
  address: string;
  storeAddresses: any[] = null
  storeItemId: any = null
  storeItemData: any = null
  exchangeUrl = environment.exchangeUrl + '/';
  randomNumber: any = Math.floor(Math.random() * 100)
  constructor(private route: ActivatedRoute, private location: Location, private nav: NavController, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.storeItemId = params.id;
      if (this.storeItemId) {
        this.getStoreItem()
      }
    });
    this.storeAddressesIndex()
  }

  async getStoreItem() {
    if (!this.storeItemId) return
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.storeViewItem(this.storeItemId).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.storeItemData = response?.data?.data
        }
        await loader.dismiss()
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

  storeAddressesIndex() {
    this.exchangeProvider.storeAddress().subscribe(
      (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.storeAddresses = response?.data?.addresses
        }
      },
      (error) => {
        console.log(error)
      }
    )
  }

  back() {
    this.location.back()
  }

  onAmount() {
    this.quantityValid = true;
  }

  onPassword() {
    const result = this.password.match(strongPasswordRegex)
    if (result) {
      this.passwordValid = true
      return
    }
    this.passwordValid = false
  }

  refer(path: string) {
    this.nav.navigateForward(path)
  }

  async buyItem() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.storeBuyItem(this.storeItemId, this.quantity, this.address).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 0) {
          this.exchangeProvider.presentToast(response?.data)
        } else {
          this.exchangeProvider.presentToast(response?.data)
          this.nav.navigateForward('store-orders')
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

}
