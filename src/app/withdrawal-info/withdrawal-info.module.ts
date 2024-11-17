import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WithdrawalInfoPageRoutingModule } from './withdrawal-info-routing.module';

import { WithdrawalInfoPage } from './withdrawal-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WithdrawalInfoPageRoutingModule
  ],
  declarations: [WithdrawalInfoPage]
})
export class WithdrawalInfoPageModule {}
