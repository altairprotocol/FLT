import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreEditAddressPage } from './store-edit-address.page';

const routes: Routes = [
  {
    path: '',
    component: StoreEditAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreEditAddressPageRoutingModule {}
