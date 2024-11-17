import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityCenterPage } from './security-center.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityCenterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityCenterPageRoutingModule {}
