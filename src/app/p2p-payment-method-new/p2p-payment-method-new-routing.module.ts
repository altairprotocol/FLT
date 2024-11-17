import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pPaymentMethodNewPage } from './p2p-payment-method-new.page';

const routes: Routes = [
  {
    path: '',
    component: P2pPaymentMethodNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pPaymentMethodNewPageRoutingModule {}
