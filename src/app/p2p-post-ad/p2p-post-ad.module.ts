import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pPostAdPageRoutingModule } from './p2p-post-ad-routing.module';

import { P2pPostAdPage } from './p2p-post-ad.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pPostAdPageRoutingModule
  ],
  declarations: [P2pPostAdPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class P2pPostAdPageModule { }
