import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-google-2fa',
  templateUrl: './google-2fa.page.html',
  styleUrls: ['./google-2fa.page.scss'],
})
export class Google2FaPage implements OnInit {
  codeGenerated:any=null;
  google2FaCode: any = null
  google2FaCodeCorrect: boolean = false
  google2faSecret:any =false;
  ga_transfer:boolean=true;
  ga_login:boolean=true;
  qrUrl:any =false;
  need_set_ga:boolean=false;
  box_enable:boolean=false;
  constructor(private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider) { }

  back() {
    this.location.back()
  }

  ngOnInit() {
    this.google2FaIndex()
  }

  validateCode() {
    this.google2FaCode = this.google2FaCode.replace(/[^a-zA-Z0-9]+/g, '');
    console.log(this.google2FaCode.length <= 4, this.google2FaCode.length > 15);

    if (this.google2FaCode.length < 5) {
      return this.google2FaCodeCorrect = false
    }

    if (this.google2FaCode.length > 15) {
      return this.google2FaCodeCorrect = false
    }

    return this.google2FaCodeCorrect = true
  }

  async google2FaIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.google2FaIndex().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ Google2FaPage ~ this.exchangeProvider.updateGoogle2fa ~ response:", response)
      if (response?.status === 1) {
        this.google2faSecret = response?.Asecret;
        this.qrUrl = response?.qrCodeUrl;
        this.need_set_ga=this.box_enable=response?.status;
      } else {
        this.exchangeProvider.presentToast(response?.message)
      }
      await loader.dismiss()
    })
  }

  async setGoogle2FaCode() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.updateGoogle2fa(this.codeGenerated,'add',this.ga_login,this.ga_transfer).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ Google2FaPage ~ this.exchangeProvider.updateGoogle2fa ~ response:", response)
      if (response?.status === 1) {
        this.exchangeProvider.presentToast(response?.data)
        this.google2FaIndex()
      } else {
        this.exchangeProvider.presentToast(response?.data)
      }
      await loader.dismiss()
    })
  }
  async deleteGoogle2FaCode() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.updateGoogle2fa(this.codeGenerated,'delete',this.ga_login,this.ga_transfer).subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ Google2FaPage ~ this.exchangeProvider.updateGoogle2fa ~ response:", response)
      if (response?.status === 1) {
        this.exchangeProvider.presentToast(response?.data)
        this.google2FaIndex()
      } else {
        this.exchangeProvider.presentToast(response?.data)
      }
      await loader.dismiss()
    })
  }

}
