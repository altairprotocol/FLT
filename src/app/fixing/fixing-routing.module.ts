import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FixingPage } from './fixing.page';

const routes: Routes = [
  {
    path: '',
    component: FixingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FixingPageRoutingModule {}
