import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pMainPaymentMethodPage } from './p2p-main-payment-method.page';

const routes: Routes = [
  {
    path: '',
    component: P2pMainPaymentMethodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pMainPaymentMethodPageRoutingModule {}
