import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityCenterPageRoutingModule } from './security-center-routing.module';

import { SecurityCenterPage } from './security-center.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityCenterPageRoutingModule
  ],
  declarations: [SecurityCenterPage]
})
export class SecurityCenterPageModule {}
