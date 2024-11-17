import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositModelPage } from './deposit-model.page';

const routes: Routes = [
  {
    path: '',
    component: DepositModelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositModelPageRoutingModule {}
