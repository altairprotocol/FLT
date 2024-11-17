import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtcrecordPageRoutingModule } from './otcrecord-routing.module';

import { OtcrecordPage } from './otcrecord.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtcrecordPageRoutingModule
  ],
  declarations: [OtcrecordPage]
})
export class OtcrecordPageModule {}
