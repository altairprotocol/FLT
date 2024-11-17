import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabIcoPageRoutingModule } from './lab-ico-routing.module';

import { LabIcoPage } from './lab-ico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LabIcoPageRoutingModule
  ],
  declarations: [LabIcoPage]
})
export class LabIcoPageModule {}
