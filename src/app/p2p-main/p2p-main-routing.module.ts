import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pMainPage } from './p2p-main.page';

const routes: Routes = [
  {
    path: '',
    component: P2pMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pMainPageRoutingModule {}
