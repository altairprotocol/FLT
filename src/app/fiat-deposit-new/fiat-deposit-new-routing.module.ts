import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiatDepositNewPage } from './fiat-deposit-new.page';

const routes: Routes = [
  {
    path: '',
    component: FiatDepositNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiatDepositNewPageRoutingModule {}
