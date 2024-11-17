import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketsPageRoutingModule } from './markets-routing.module';

import { MarketsPage } from './markets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketsPageRoutingModule
  ],
  declarations: [MarketsPage]
})
export class MarketsPageModule {}
