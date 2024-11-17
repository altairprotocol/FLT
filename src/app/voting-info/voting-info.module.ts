import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotingInfoPageRoutingModule } from './voting-info-routing.module';

import { VotingInfoPage } from './voting-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotingInfoPageRoutingModule
  ],
  declarations: [VotingInfoPage]
})
export class VotingInfoPageModule {}
