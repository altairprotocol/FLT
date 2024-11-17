import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiatHistoryPage } from './fiat-history.page';

const routes: Routes = [
  {
    path: '',
    component: FiatHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiatHistoryPageRoutingModule {}
