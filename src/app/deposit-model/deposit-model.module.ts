import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositModelPageRoutingModule } from './deposit-model-routing.module';

import { DepositModelPage } from './deposit-model.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositModelPageRoutingModule
  ],
  declarations: [DepositModelPage]
})
export class DepositModelPageModule {}
