import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pOrderInfoPageRoutingModule } from './p2p-order-info-routing.module';

import { P2pOrderInfoPage } from './p2p-order-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pOrderInfoPageRoutingModule
  ],
  declarations: [P2pOrderInfoPage]
})
export class P2pOrderInfoPageModule {}
