import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepositInfoPage } from './deposit-info.page';

const routes: Routes = [
  {
    path: '',
    component: DepositInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositInfoPageRoutingModule {}
