import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pBuyPage } from './p2p-buy.page';

const routes: Routes = [
  {
    path: '',
    component: P2pBuyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pBuyPageRoutingModule {}
