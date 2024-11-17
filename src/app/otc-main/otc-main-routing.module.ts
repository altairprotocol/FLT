import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtcMainPage } from './otc-main.page';

const routes: Routes = [
  {
    path: '',
    component: OtcMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtcMainPageRoutingModule {}
