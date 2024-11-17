import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pFaqDetailsPageRoutingModule } from './p2p-faq-details-routing.module';

import { P2pFaqDetailsPage } from './p2p-faq-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pFaqDetailsPageRoutingModule
  ],
  declarations: [P2pFaqDetailsPage]
})
export class P2pFaqDetailsPageModule {}
