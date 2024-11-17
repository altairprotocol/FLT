import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiatOutPageRoutingModule } from './fiat-out-routing.module';

import { FiatOutPage } from './fiat-out.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiatOutPageRoutingModule
  ],
  declarations: [FiatOutPage]
})
export class FiatOutPageModule {}
