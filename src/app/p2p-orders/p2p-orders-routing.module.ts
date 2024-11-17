import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pOrdersPage } from './p2p-orders.page';

const routes: Routes = [
  {
    path: '',
    component: P2pOrdersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pOrdersPageRoutingModule {}
