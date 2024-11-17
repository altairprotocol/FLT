import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pMainExpressPage } from './p2p-main-express.page';

const routes: Routes = [
  {
    path: '',
    component: P2pMainExpressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pMainExpressPageRoutingModule {}
