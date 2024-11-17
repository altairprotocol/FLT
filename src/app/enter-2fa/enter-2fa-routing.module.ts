import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Enter2faPage } from './enter-2fa.page';

const routes: Routes = [
  {
    path: '',
    component: Enter2faPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Enter2faPageRoutingModule {}
