import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pBuyPayPage } from './p2p-buy-pay.page';

const routes: Routes = [
  {
    path: '',
    component: P2pBuyPayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pBuyPayPageRoutingModule {}
