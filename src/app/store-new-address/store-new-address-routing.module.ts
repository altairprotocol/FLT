import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreNewAddressPage } from './store-new-address.page';

const routes: Routes = [
  {
    path: '',
    component: StoreNewAddressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreNewAddressPageRoutingModule {}
