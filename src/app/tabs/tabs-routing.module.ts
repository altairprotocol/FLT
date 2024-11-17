import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home2/home2.module').then((m) => m.Home2PageModule),
        data: { showMenu: true }
      },
      {
        path: 'markets',
        loadChildren: () =>
          import('../markets/markets.module').then((m) => m.MarketsPageModule),
        data: { showMenu: true }
      },
      {
        path: 'trade',
        loadChildren: () =>
          import('../trade/trade.module').then((m) => m.TradePageModule),
        data: { showMenu: false }
      },
      {
        path: 'wallet',
        loadChildren: () =>
          import('../wallet/wallet.module').then((m) => m.WalletPageModule),
        data: { showMenu: false }
      },
      {
        path: 'otc',
        loadChildren: () => import('./otc/otc.module').then(m => m.OtcPageModule),
        data: { showMenu: true }
      },
      {
        path: 'fixing',
        loadChildren: () => import('../fixing/fixing.module').then(m => m.FixingPageModule),
        data: { showMenu: true }
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
