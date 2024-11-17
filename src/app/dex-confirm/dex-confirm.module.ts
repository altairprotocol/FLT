import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DexConfirmPageRoutingModule } from './dex-confirm-routing.module';

import { DexConfirmPage } from './dex-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DexConfirmPageRoutingModule
  ],
  declarations: [DexConfirmPage]
})
export class DexConfirmPageModule {}
