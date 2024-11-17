import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pOrderInfoPage } from './p2p-order-info.page';

const routes: Routes = [
  {
    path: '',
    component: P2pOrderInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pOrderInfoPageRoutingModule {}
