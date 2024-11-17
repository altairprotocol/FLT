import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pFaqDetailsPage } from './p2p-faq-details.page';

const routes: Routes = [
  {
    path: '',
    component: P2pFaqDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pFaqDetailsPageRoutingModule {}
