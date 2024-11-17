import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabIcoPage } from './lab-ico.page';

const routes: Routes = [
  {
    path: '',
    component: LabIcoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabIcoPageRoutingModule {}
