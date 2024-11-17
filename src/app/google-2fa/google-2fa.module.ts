import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Google2FaPageRoutingModule } from './google-2fa-routing.module';

import { Google2FaPage } from './google-2fa.page';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRCodeModule,
    Google2FaPageRoutingModule
  ],
  declarations: [Google2FaPage]
})
export class Google2FaPageModule {}
