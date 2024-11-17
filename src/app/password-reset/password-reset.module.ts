import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PasswordResetPageRoutingModule } from './password-reset-routing.module';

import { PasswordResetPage } from './password-reset.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PasswordResetPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [PasswordResetPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PasswordResetPageModule { }
