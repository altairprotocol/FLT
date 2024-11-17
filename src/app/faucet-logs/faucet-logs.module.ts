import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FaucetLogsPageRoutingModule } from './faucet-logs-routing.module';

import { FaucetLogsPage } from './faucet-logs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FaucetLogsPageRoutingModule
  ],
  declarations: [FaucetLogsPage]
})
export class FaucetLogsPageModule {}
