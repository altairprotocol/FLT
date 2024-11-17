import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pAdsPageRoutingModule } from './p2p-ads-routing.module';

import { P2pAdsPage } from './p2p-ads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pAdsPageRoutingModule
  ],
  declarations: [P2pAdsPage]
})
export class P2pAdsPageModule {}
