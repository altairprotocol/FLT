import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pMerchantPage } from './p2p-merchant.page';

const routes: Routes = [
  {
    path: '',
    component: P2pMerchantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pMerchantPageRoutingModule {}
