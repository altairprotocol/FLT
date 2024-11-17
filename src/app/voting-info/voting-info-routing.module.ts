import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VotingInfoPage } from './voting-info.page';

const routes: Routes = [
  {
    path: '',
    component: VotingInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VotingInfoPageRoutingModule {}
