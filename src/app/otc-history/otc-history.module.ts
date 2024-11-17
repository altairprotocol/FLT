import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtcHistoryPageRoutingModule } from './otc-history-routing.module';

import { OtcHistoryPage } from './otc-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtcHistoryPageRoutingModule
  ],
  declarations: [OtcHistoryPage]
})
export class OtcHistoryPageModule {}
