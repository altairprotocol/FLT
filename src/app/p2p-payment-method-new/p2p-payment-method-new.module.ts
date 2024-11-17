import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pPaymentMethodNewPageRoutingModule } from './p2p-payment-method-new-routing.module';

import { P2pPaymentMethodNewPage } from './p2p-payment-method-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pPaymentMethodNewPageRoutingModule
  ],
  declarations: [P2pPaymentMethodNewPage]
})
export class P2pPaymentMethodNewPageModule {}
