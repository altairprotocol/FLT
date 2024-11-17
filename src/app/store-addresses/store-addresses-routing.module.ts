import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreAddressesPage } from './store-addresses.page';

const routes: Routes = [
  {
    path: '',
    component: StoreAddressesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreAddressesPageRoutingModule {}
