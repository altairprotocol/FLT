import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { P2pChatPageRoutingModule } from './p2p-chat-routing.module';

import { P2pChatPage } from './p2p-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    P2pChatPageRoutingModule
  ],
  declarations: [P2pChatPage]
})
export class P2pChatPageModule {}
