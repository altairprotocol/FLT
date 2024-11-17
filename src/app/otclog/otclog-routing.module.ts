import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtclogPage } from './otclog.page';

const routes: Routes = [
  {
    path: '',
    component: OtclogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtclogPageRoutingModule {}
