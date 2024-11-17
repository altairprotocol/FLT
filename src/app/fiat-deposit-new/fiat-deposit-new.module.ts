import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiatDepositNewPageRoutingModule } from './fiat-deposit-new-routing.module';

import { FiatDepositNewPage } from './fiat-deposit-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiatDepositNewPageRoutingModule
  ],
  declarations: [FiatDepositNewPage]
})
export class FiatDepositNewPageModule {}
