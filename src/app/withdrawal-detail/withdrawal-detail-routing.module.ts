import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawalDetailPage } from './withdrawal-detail.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawalDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawalDetailPageRoutingModule {}
