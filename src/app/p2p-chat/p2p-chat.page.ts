import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-p2p-chat',
  templateUrl: './p2p-chat.page.html',
  styleUrls: ['./p2p-chat.page.scss'],
})
export class P2pChatPage implements OnInit {

  id: any = null
  message: any = null
  currentUsername: string = null
  chats: any = null

  amount: any = 0
  name: any = 'P2P Chat'
  amountCurrency: any = 'USD'
  orderStatus: any = 0
  constructor(private route: ActivatedRoute, private location: Location, private loadingCtrl: LoadingController, private exchangeProvider: ExchangeProvider) {
    this.currentUsername = this.exchangeProvider.getUserName()
    this.route.queryParams.subscribe((params) => {
      if (params) {
        this.name = params?.name ? params.name : null
        this.amount = params?.amount ? params.amount : null
        this.amountCurrency = params?.amountCurrency ? params.amountCurrency : null
        this.orderStatus = params?.orderStatus ? params.orderStatus : null
        this.id = params?.orderID ? params.orderID : null
      }
    });
  }

  ngOnInit() {
    this.getChat()
  }

  back() {
    this.location.back()
  }

  async getChat() {
    if (!this.id) {
      return
    }
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pGetChat(this.id).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.chats = response?.data
        }
        await loader.dismiss()
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

  async sendChat() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pSendChat(this.id, this.message).subscribe(
      async (data) => {
        const response = JSON.parse(JSON.stringify(data as any));
        console.log("🚀 ~ FixingPage ~ ngOnInit ~ response:", response)
        if (response?.status === 1) {
          this.getChat()
          this.message = null
        }
        await loader.dismiss()
      },
      async (error) => {
        console.log(error)
        await loader.dismiss()
      }
    )
  }

  report() {
    this.exchangeProvider.presentToast("Coming soon")
  }

}
