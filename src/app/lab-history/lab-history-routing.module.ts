import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabHistoryPage } from './lab-history.page';

const routes: Routes = [
  {
    path: '',
    component: LabHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabHistoryPageRoutingModule {}
