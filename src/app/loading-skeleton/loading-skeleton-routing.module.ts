import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoadingSkeletonPage } from './loading-skeleton.page';

const routes: Routes = [
  {
    path: '',
    component: LoadingSkeletonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoadingSkeletonPageRoutingModule {}
