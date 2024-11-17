import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirdropPage } from './airdrop.page';

const routes: Routes = [
  {
    path: '',
    component: AirdropPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirdropPageRoutingModule {}
