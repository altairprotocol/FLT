import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pBuyPayDonePageRoutingModule } from './p2p-buy-pay-done-routing.module';

import { P2pBuyPayDonePage } from './p2p-buy-pay-done.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pBuyPayDonePageRoutingModule
  ],
  declarations: [P2pBuyPayDonePage]
})
export class P2pBuyPayDonePageModule {}
