import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { IonicModule } from '@ionic/angular';
import { MarketDetailComponent } from './market-detail/market-detail.component';


@NgModule({
  declarations: [MarketDetailComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    IonicModule
  ]
})
export class PagesModule { }
