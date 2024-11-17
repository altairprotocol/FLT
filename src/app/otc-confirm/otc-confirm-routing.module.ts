import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtcConfirmPage } from './otc-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: OtcConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtcConfirmPageRoutingModule {}
