import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaucetPageRoutingModule } from './faucet-routing.module';

import { FaucetPage } from './faucet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaucetPageRoutingModule
  ],
  declarations: [FaucetPage]
})
export class FaucetPageModule {}
