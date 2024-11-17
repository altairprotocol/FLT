import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Enter2faPageRoutingModule } from './enter-2fa-routing.module';

import { Enter2faPage } from './enter-2fa.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Enter2faPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [Enter2faPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Enter2faPageModule { }
