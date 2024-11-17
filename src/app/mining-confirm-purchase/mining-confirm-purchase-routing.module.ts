import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiningConfirmPurchasePage } from './mining-confirm-purchase.page';

const routes: Routes = [
  {
    path: '',
    component: MiningConfirmPurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiningConfirmPurchasePageRoutingModule {}
