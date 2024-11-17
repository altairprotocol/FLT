import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileCommunityPage } from './profile-community.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileCommunityPageRoutingModule {}
