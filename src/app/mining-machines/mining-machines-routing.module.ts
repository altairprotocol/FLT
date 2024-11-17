import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiningMachinesPage } from './mining-machines.page';

const routes: Routes = [
  {
    path: '',
    component: MiningMachinesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiningMachinesPageRoutingModule {}
