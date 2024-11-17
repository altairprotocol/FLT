import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtcrecordPage } from './otcrecord.page';

const routes: Routes = [
  {
    path: '',
    component: OtcrecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtcrecordPageRoutingModule {}
