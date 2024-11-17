import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pBuyPayCancelPageRoutingModule } from './p2p-buy-pay-cancel-routing.module';

import { P2pBuyPayCancelPage } from './p2p-buy-pay-cancel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pBuyPayCancelPageRoutingModule
  ],
  declarations: [P2pBuyPayCancelPage]
})
export class P2pBuyPayCancelPageModule {}
