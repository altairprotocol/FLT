import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pPaymentSettingsPageRoutingModule } from './p2p-payment-settings-routing.module';

import { P2pPaymentSettingsPage } from './p2p-payment-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pPaymentSettingsPageRoutingModule
  ],
  declarations: [P2pPaymentSettingsPage]
})
export class P2pPaymentSettingsPageModule {}
