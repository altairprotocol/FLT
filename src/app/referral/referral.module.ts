import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReferralPageRoutingModule } from './referral-routing.module';

import { ReferralPage } from './referral.page';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    ReferralPageRoutingModule
  ],
  declarations: [ReferralPage]
})
export class ReferralPageModule { }
