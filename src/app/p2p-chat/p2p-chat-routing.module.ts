import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { P2pChatPage } from './p2p-chat.page';

const routes: Routes = [
  {
    path: '',
    component: P2pChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class P2pChatPageRoutingModule {}
