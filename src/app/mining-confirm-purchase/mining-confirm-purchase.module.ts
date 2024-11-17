import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiningConfirmPurchasePageRoutingModule } from './mining-confirm-purchase-routing.module';

import { MiningConfirmPurchasePage } from './mining-confirm-purchase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiningConfirmPurchasePageRoutingModule
  ],
  declarations: [MiningConfirmPurchasePage]
})
export class MiningConfirmPurchasePageModule {}
