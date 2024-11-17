import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pBuyPayPageRoutingModule } from './p2p-buy-pay-routing.module';

import { P2pBuyPayPage } from './p2p-buy-pay.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    P2pBuyPayPageRoutingModule
  ],
  declarations: [P2pBuyPayPage]
})
export class P2pBuyPayPageModule { }
