import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabHistoryPageRoutingModule } from './lab-history-routing.module';

import { LabHistoryPage } from './lab-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LabHistoryPageRoutingModule
  ],
  declarations: [LabHistoryPage]
})
export class LabHistoryPageModule {}
