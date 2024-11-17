import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LabInfoPageRoutingModule } from './lab-info-routing.module';

import { LabInfoPage } from './lab-info.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    LabInfoPageRoutingModule
  ],
  declarations: [LabInfoPage]
})
export class LabInfoPageModule { }
