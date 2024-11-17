import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletTransferHistoryPageRoutingModule } from './wallet-transfer-history-routing.module';

import { WalletTransferHistoryPage } from './wallet-transfer-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletTransferHistoryPageRoutingModule
  ],
  declarations: [WalletTransferHistoryPage]
})
export class WalletTransferHistoryPageModule {}
