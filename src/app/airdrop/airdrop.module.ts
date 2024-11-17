import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirdropPageRoutingModule } from './airdrop-routing.module';

import { AirdropPage } from './airdrop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AirdropPageRoutingModule
  ],
  declarations: [AirdropPage]
})
export class AirdropPageModule {}
