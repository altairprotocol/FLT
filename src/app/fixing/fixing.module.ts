import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixingPageRoutingModule } from './fixing-routing.module';

import { FixingPage } from './fixing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixingPageRoutingModule
  ],
  declarations: [FixingPage]
})
export class FixingPageModule {}
