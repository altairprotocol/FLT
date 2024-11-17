import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaucetPage } from './faucet.page';

const routes: Routes = [
  {
    path: '',
    component: FaucetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaucetPageRoutingModule {}
