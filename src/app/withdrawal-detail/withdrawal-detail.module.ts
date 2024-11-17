import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawalDetailPageRoutingModule } from './withdrawal-detail-routing.module';

import { WithdrawalDetailPage } from './withdrawal-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawalDetailPageRoutingModule
  ],
  declarations: [WithdrawalDetailPage]
})
export class WithdrawalDetailPageModule { }
