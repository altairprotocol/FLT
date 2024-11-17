import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreNewAddressPageRoutingModule } from './store-new-address-routing.module';

import { StoreNewAddressPage } from './store-new-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreNewAddressPageRoutingModule
  ],
  declarations: [StoreNewAddressPage]
})
export class StoreNewAddressPageModule {}
