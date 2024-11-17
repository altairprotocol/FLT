import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pMainPageRoutingModule } from './p2p-main-routing.module';

import { P2pMainPage } from './p2p-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pMainPageRoutingModule
  ],
  declarations: [P2pMainPage]
})
export class P2pMainPageModule {}
