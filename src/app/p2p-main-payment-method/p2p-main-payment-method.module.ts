import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pMainPaymentMethodPageRoutingModule } from './p2p-main-payment-method-routing.module';

import { P2pMainPaymentMethodPage } from './p2p-main-payment-method.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pMainPaymentMethodPageRoutingModule
  ],
  declarations: [P2pMainPaymentMethodPage]
})
export class P2pMainPaymentMethodPageModule {}
