import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtcConfirmPageRoutingModule } from './otc-confirm-routing.module';

import { OtcConfirmPage } from './otc-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtcConfirmPageRoutingModule
  ],
  declarations: [OtcConfirmPage]
})
export class OtcConfirmPageModule {}
