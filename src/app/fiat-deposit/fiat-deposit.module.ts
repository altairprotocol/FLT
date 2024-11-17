import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiatDepositPageRoutingModule } from './fiat-deposit-routing.module';

import { FiatDepositPage } from './fiat-deposit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiatDepositPageRoutingModule
  ],
  declarations: [FiatDepositPage]
})
export class FiatDepositPageModule {}
