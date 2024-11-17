import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DexPage } from './dex.page';

const routes: Routes = [
  {
    path: '',
    component: DexPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DexPageRoutingModule {}
