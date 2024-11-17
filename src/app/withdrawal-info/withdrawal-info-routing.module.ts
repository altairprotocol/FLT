import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WithdrawalInfoPage } from './withdrawal-info.page';

const routes: Routes = [
  {
    path: '',
    component: WithdrawalInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WithdrawalInfoPageRoutingModule {}
