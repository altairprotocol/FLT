import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixingHistoryPage } from './fixing-history.page';

const routes: Routes = [
  {
    path: '',
    component: FixingHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixingHistoryPageRoutingModule {}
