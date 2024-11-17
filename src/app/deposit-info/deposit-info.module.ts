import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepositInfoPageRoutingModule } from './deposit-info-routing.module';

import { DepositInfoPage } from './deposit-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepositInfoPageRoutingModule
  ],
  declarations: [DepositInfoPage]
})
export class DepositInfoPageModule {}
