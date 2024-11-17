import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtclogPageRoutingModule } from './otclog-routing.module';

import { OtclogPage } from './otclog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtclogPageRoutingModule
  ],
  declarations: [OtclogPage]
})
export class OtclogPageModule {}
