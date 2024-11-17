import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositDetailPageRoutingModule } from './deposit-detail-routing.module';

import { DepositDetailPage } from './deposit-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositDetailPageRoutingModule
  ],
  declarations: [DepositDetailPage]
})
export class DepositDetailPageModule {}
