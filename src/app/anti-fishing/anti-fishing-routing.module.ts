import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AntiFishingPage } from './anti-fishing.page';

const routes: Routes = [
  {
    path: '',
    component: AntiFishingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AntiFishingPageRoutingModule {}
