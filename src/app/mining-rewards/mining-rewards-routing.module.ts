import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiningRewardsPage } from './mining-rewards.page';

const routes: Routes = [
  {
    path: '',
    component: MiningRewardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiningRewardsPageRoutingModule {}
