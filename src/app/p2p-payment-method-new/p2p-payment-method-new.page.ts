import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExchangeProvider } from '../codono.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-p2p-payment-method-new',
  templateUrl: './p2p-payment-method-new.page.html',
  styleUrls: ['./p2p-payment-method-new.page.scss'],
})
export class P2pPaymentMethodNewPage implements OnInit {


  paymentMethod: string = 'upi'
  fullName: string;
  bankAccountNumber: string;
  bankName: string;
  ifscCode: string;
  bankBranch: string;
  upiID: string;
  paypalID: string;
  isEditing: boolean = false

  constructor(private route: ActivatedRoute, private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private nav: NavController) {
    // this.route.queryParams.subscribe((params) => {
    //   this.paymentMethod = params?.paymentMethod;
    //   this.bankName = params?.bankName
    //   this.bankAccountNumber = params?.bankAccountNumber
    //   this.ifscCode = params?.ifscCode
    //   if (params) {
    //     this.isEditing = true
    //   }
    // });
  }

  ngOnInit() {

  }

  async addPaymentMethod() {
    if (this.paymentMethod == 'bank') {
      if (this.isEditing) {
        return this.editBank()
      } else {
        return this.addBank()
      }
    }
    let information
    if (this.paymentMethod == 'upi') {
      information = this.upiID
    } else if (this.paymentMethod == 'paypal') {
      information = this.paypalID
    }
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pUserAddMethod(this.paymentMethod, information).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        await loader.dismiss()
        if (response?.status === 0) {
          this.exchangeProvider.presentToast(response?.data)
        } else {
          if (typeof response?.data === 'string') {
            this.exchangeProvider.presentToast(response?.data)
          }
          // this.nav.navigateForward("p2p-main-payment-method")
        }
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  async addBank() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pUserAddBankMethod(this.bankName, this.ifscCode, this.bankAccountNumber).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 0) {
          this.exchangeProvider.presentToast(response?.data)
        } else {
          if (typeof response?.data === 'string') {
            this.exchangeProvider.presentToast(response?.data)
          }
          if (this.paymentMethod == 'bank') {
            this.nav.navigateForward("p2p-payment-settings")
          }
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  async editBank() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pDoEditBank(this.bankName, this.ifscCode, this.bankAccountNumber).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 0) {
          this.exchangeProvider.presentToast(response?.data)
        } else {
          if (typeof response?.data === 'string') {
            this.exchangeProvider.presentToast(response?.data)
          }
          if (this.paymentMethod == 'bank') {
            this.nav.navigateForward("p2p-payment-settings")
          }
        }
        await loader.dismiss()
      },
      async (error) => {
        await loader.dismiss()
        console.log(error)
      }
    )
  }

  back() {
    this.location.back()
  }



}
