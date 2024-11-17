import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtcHistoryPage } from './otc-history.page';

const routes: Routes = [
  {
    path: '',
    component: OtcHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtcHistoryPageRoutingModule {}
