import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FaucetLogsPage } from './faucet-logs.page';

const routes: Routes = [
  {
    path: '',
    component: FaucetLogsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FaucetLogsPageRoutingModule {}
