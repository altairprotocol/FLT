import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiatHistoryPageRoutingModule } from './fiat-history-routing.module';

import { FiatHistoryPage } from './fiat-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiatHistoryPageRoutingModule
  ],
  declarations: [FiatHistoryPage]
})
export class FiatHistoryPageModule {}
