import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { ExchangeProvider } from '../codono.service';

@Component({
  selector: 'app-p2p-orders',
  templateUrl: './p2p-orders.page.html',
  styleUrls: ['./p2p-orders.page.scss'],
})
export class P2pOrdersPage implements OnInit {
  activeOrderSegment: string = 'Placed'
  activeSubOrderSegment: string = 'All'
  ordersList: any = null
  reserveOrderList: any = null
  receivedOrdersList: any = null
  receivedReserveOrderList: any = null

  constructor(private location: Location, private exchangeProvider: ExchangeProvider, private loadingCtrl: LoadingController, private nav: NavController) { }

  ngOnInit() {
    this.p2pOrdersIndex()
    this.receivedP2pOrdersIndex()
  }

  async p2pOrdersIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pOrders().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ ConvertPage ~ this.exchangeProvider.convertIndex ~ response:", response)
      if (response?.status === 1) {
        this.reserveOrderList = response?.data?.p2pOrders
        this.ordersList = response?.data?.p2pOrders
      }
      await loader.dismiss()
    })
  }

  async receivedP2pOrdersIndex() {
    let loader = await this.loadingCtrl.create({ message: "Please wait.." })
    await loader.present()
    this.exchangeProvider.p2pReceivedOrders().subscribe(async (data) => {
      let response = JSON.parse(JSON.stringify(data as any[]));
      console.log("🚀 ~ ConvertPage ~ this.exchangeProvider.convertIndex ~ response:", response)
      if (response?.status === 1) {
        this.receivedOrdersList = response?.data?.p2pOrders
        this.receivedReserveOrderList = response?.data?.p2pOrders
      }
      await loader.dismiss()
    })
  }

  back() {
    this.location.back()
  }

  async changeOrderSegment(value: string) {
    if (value == 'Received') {
      if (!this.receivedReserveOrderList) {
        await this.receivedP2pOrdersIndex()
      }
      this.ordersList = this.receivedReserveOrderList
    } else {
      this.ordersList = this.reserveOrderList
    }
    this.activeOrderSegment = value
    if (this.activeSubOrderSegment != 'All') {
      this.activeSubOrderSegment = 'All'
    }
  }


  changeSubOrderSegment(value: string) {
    if (this.activeOrderSegment == 'Received') {
      if (value == 'All') {
        this.ordersList = this.receivedReserveOrderList
      } else if (value == 'In Progress') {
        this.ordersList = this.receivedReserveOrderList.filter((data) => data?.status == '0')
      }
      else if (value == 'Cancelled') {
        this.ordersList = this.receivedReserveOrderList.filter((data) => data?.status == '2')
      }
    } else {
      if (value == 'All') {
        this.ordersList = this.reserveOrderList
      } else if (value == 'In Progress') {
        this.ordersList = this.reserveOrderList.filter((data) => data?.status == '0')
      }
      else if (value == 'Cancelled') {
        this.ordersList = this.reserveOrderList.filter((data) => data?.status == '2')
      }
    }
    this.activeSubOrderSegment = value
  }

  referToOrderInfo(orderID: any) {
    this.nav.navigateRoot('p2p-order-info', {
      queryParams: { orderID: orderID },
    });
  }

  formatNumber(float: any) {
    if (!float) return
    return parseFloat(float)
  }

}
