import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pMainExpressPageRoutingModule } from './p2p-main-express-routing.module';

import { P2pMainExpressPage } from './p2p-main-express.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pMainExpressPageRoutingModule
  ],
  declarations: [P2pMainExpressPage]
})
export class P2pMainExpressPageModule {}
