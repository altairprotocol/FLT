import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pFaqPage } from './p2p-faq.page';

const routes: Routes = [
  {
    path: '',
    component: P2pFaqPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pFaqPageRoutingModule {}
