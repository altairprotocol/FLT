import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileAboutPage } from './profile-about.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileAboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileAboutPageRoutingModule {}
