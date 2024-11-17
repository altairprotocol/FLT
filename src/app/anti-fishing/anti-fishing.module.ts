import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AntiFishingPageRoutingModule } from './anti-fishing-routing.module';

import { AntiFishingPage } from './anti-fishing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AntiFishingPageRoutingModule
  ],
  declarations: [AntiFishingPage]
})
export class AntiFishingPageModule {}
