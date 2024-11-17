import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiningMachinesPageRoutingModule } from './mining-machines-routing.module';

import { MiningMachinesPage } from './mining-machines.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiningMachinesPageRoutingModule
  ],
  declarations: [MiningMachinesPage]
})
export class MiningMachinesPageModule {}
