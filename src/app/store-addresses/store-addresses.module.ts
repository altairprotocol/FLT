import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreAddressesPageRoutingModule } from './store-addresses-routing.module';

import { StoreAddressesPage } from './store-addresses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreAddressesPageRoutingModule
  ],
  declarations: [StoreAddressesPage]
})
export class StoreAddressesPageModule {}
