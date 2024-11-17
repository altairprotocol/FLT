import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DexHistoryPage } from './dex-history.page';

const routes: Routes = [
  {
    path: '',
    component: DexHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DexHistoryPageRoutingModule {}
