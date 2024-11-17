import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileAboutPageRoutingModule } from './profile-about-routing.module';

import { ProfileAboutPage } from './profile-about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileAboutPageRoutingModule
  ],
  declarations: [ProfileAboutPage]
})
export class ProfileAboutPageModule {}
