import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddbankPageRoutingModule } from './addbank-routing.module';

import { AddbankPage } from './addbank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddbankPageRoutingModule
  ],
  declarations: [AddbankPage]
})
export class AddbankPageModule {}
