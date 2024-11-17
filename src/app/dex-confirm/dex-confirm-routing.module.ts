import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DexConfirmPage } from './dex-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: DexConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DexConfirmPageRoutingModule {}
