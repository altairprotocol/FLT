import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { IonicModule } from '@ionic/angular';

import { Register2PageRoutingModule } from './register2-routing.module';

import { Register2Page } from './register2.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Register2PageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [Register2Page],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Register2PageModule { }
