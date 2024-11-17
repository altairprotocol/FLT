import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pBuyPayDonePage } from './p2p-buy-pay-done.page';

const routes: Routes = [
  {
    path: '',
    component: P2pBuyPayDonePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pBuyPayDonePageRoutingModule {}
