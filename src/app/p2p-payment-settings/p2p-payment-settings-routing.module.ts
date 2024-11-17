import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pPaymentSettingsPage } from './p2p-payment-settings.page';

const routes: Routes = [
  {
    path: '',
    component: P2pPaymentSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pPaymentSettingsPageRoutingModule {}
