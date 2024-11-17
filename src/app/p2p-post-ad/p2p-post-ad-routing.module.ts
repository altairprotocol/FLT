import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pPostAdPage } from './p2p-post-ad.page';

const routes: Routes = [
  {
    path: '',
    component: P2pPostAdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pPostAdPageRoutingModule {}
