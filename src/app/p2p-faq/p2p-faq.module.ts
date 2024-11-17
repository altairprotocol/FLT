import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pFaqPageRoutingModule } from './p2p-faq-routing.module';

import { P2pFaqPage } from './p2p-faq.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pFaqPageRoutingModule
  ],
  declarations: [P2pFaqPage]
})
export class P2pFaqPageModule {}
