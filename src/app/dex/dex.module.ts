import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DexPageRoutingModule } from './dex-routing.module';

import { DexPage } from './dex.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DexPageRoutingModule
  ],
  declarations: [DexPage]
})
export class DexPageModule {}
