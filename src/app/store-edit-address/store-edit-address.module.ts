import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreEditAddressPageRoutingModule } from './store-edit-address-routing.module';

import { StoreEditAddressPage } from './store-edit-address.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreEditAddressPageRoutingModule
  ],
  declarations: [StoreEditAddressPage]
})
export class StoreEditAddressPageModule {}
