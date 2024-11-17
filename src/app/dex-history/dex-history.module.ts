import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DexHistoryPageRoutingModule } from './dex-history-routing.module';

import { DexHistoryPage } from './dex-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DexHistoryPageRoutingModule
  ],
  declarations: [DexHistoryPage]
})
export class DexHistoryPageModule {}
