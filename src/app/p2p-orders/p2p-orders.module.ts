import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pOrdersPageRoutingModule } from './p2p-orders-routing.module';

import { P2pOrdersPage } from './p2p-orders.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pOrdersPageRoutingModule
  ],
  declarations: [P2pOrdersPage]
})
export class P2pOrdersPageModule {}
