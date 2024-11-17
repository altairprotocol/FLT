import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileCommunityPageRoutingModule } from './profile-community-routing.module';

import { ProfileCommunityPage } from './profile-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileCommunityPageRoutingModule
  ],
  declarations: [ProfileCommunityPage]
})
export class ProfileCommunityPageModule {}
