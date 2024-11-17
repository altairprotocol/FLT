import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoadingSkeletonPageRoutingModule } from './loading-skeleton-routing.module';

import { LoadingSkeletonPage } from './loading-skeleton.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoadingSkeletonPageRoutingModule
  ],
  declarations: [LoadingSkeletonPage]
})
export class LoadingSkeletonPageModule {}
