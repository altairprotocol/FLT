import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pBuyPayCancelPage } from './p2p-buy-pay-cancel.page';

const routes: Routes = [
  {
    path: '',
    component: P2pBuyPayCancelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pBuyPayCancelPageRoutingModule {}
