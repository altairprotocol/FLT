import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiatOutPage } from './fiat-out.page';

const routes: Routes = [
  {
    path: '',
    component: FiatOutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiatOutPageRoutingModule {}
