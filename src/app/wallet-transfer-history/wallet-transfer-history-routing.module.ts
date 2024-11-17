import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletTransferHistoryPage } from './wallet-transfer-history.page';

const routes: Routes = [
  {
    path: '',
    component: WalletTransferHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletTransferHistoryPageRoutingModule {}
