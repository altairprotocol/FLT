import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiningRewardsPageRoutingModule } from './mining-rewards-routing.module';

import { MiningRewardsPage } from './mining-rewards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiningRewardsPageRoutingModule
  ],
  declarations: [MiningRewardsPage]
})
export class MiningRewardsPageModule {}
