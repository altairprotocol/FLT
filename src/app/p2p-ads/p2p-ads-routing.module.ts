import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pAdsPage } from './p2p-ads.page';

const routes: Routes = [
  {
    path: '',
    component: P2pAdsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pAdsPageRoutingModule {}
