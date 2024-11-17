import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pBuyPageRoutingModule } from './p2p-buy-routing.module';

import { P2pBuyPage } from './p2p-buy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pBuyPageRoutingModule
  ],
  declarations: [P2pBuyPage]
})
export class P2pBuyPageModule {}
