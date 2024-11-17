import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Google2FaPage } from './google-2fa.page';

const routes: Routes = [
  {
    path: '',
    component: Google2FaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Google2FaPageRoutingModule {}
