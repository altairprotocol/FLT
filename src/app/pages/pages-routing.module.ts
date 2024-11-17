import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketDetailComponent } from './market-detail/market-detail.component';

const routes: Routes = [
  {
    path: 'market-detail', component: MarketDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
