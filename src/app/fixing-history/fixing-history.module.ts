import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixingHistoryPageRoutingModule } from './fixing-history-routing.module';

import { FixingHistoryPage } from './fixing-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixingHistoryPageRoutingModule
  ],
  declarations: [FixingHistoryPage]
})
export class FixingHistoryPageModule {}
