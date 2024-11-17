import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtcMainPageRoutingModule } from './otc-main-routing.module';

import { OtcMainPage } from './otc-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtcMainPageRoutingModule
  ],
  declarations: [OtcMainPage]
})
export class OtcMainPageModule {}
