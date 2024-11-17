import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./tabs/tabs.module').then((m) => m.TabsPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./tabs/home2/home2.module').then((m) => m.Home2PageModule),
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'markets',
    loadChildren: () =>
      import('./markets/markets.module').then((m) => m.MarketsPageModule),
  },
  {
    path: 'trade',
    loadChildren: () => import('./trade/trade.module').then(m => m.TradePageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletPageModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then(m => m.SupportPageModule)
  },
  {
    path: 'balance',
    loadChildren: () => import('./balance/balance.module').then(m => m.BalancePageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then(m => m.HistoryPageModule)
  },
  {
    path: 'deposit-model',
    loadChildren: () => import('./deposit-model/deposit-model.module').then(m => m.DepositModelPageModule)
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawPageModule)
  },
  {
    path: 'deposit',
    loadChildren: () => import('./deposit/deposit.module').then(m => m.DepositPageModule)
  },
  {
    path: 'deposit-detail',
    loadChildren: () => import('./deposit-detail/deposit-detail.module').then(m => m.DepositDetailPageModule)
  },
  {
    path: 'referral',
    loadChildren: () => import('./referral/referral.module').then(m => m.ReferralPageModule)
  },
  {
    path: 'search-wallet',
    loadChildren: () => import('./search-wallet/search-wallet.module').then(m => m.SearchWalletPageModule)
  },
  {
    path: 'fiat-deposit',
    loadChildren: () => import('./fiat-deposit/fiat-deposit.module').then(m => m.FiatDepositPageModule)
  },
  {
    path: 'fiat-out',
    loadChildren: () => import('./fiat-out/fiat-out.module').then(m => m.FiatOutPageModule)
  },
  {
    path: 'fiat-history',
    loadChildren: () => import('./fiat-history/fiat-history.module').then(m => m.FiatHistoryPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersPageModule)
  },
  {
    path: 'deposit-info',
    loadChildren: () => import('./deposit-info/deposit-info.module').then(m => m.DepositInfoPageModule)
  },
  {
    path: 'withdrawal-detail',
    loadChildren: () => import('./withdrawal-detail/withdrawal-detail.module').then(m => m.WithdrawalDetailPageModule)
  },
  {
    path: 'withdrawal-info',
    loadChildren: () => import('./withdrawal-info/withdrawal-info.module').then(m => m.WithdrawalInfoPageModule)
  },
  {
    path: 'addbank',
    loadChildren: () => import('./addbank/addbank.module').then(m => m.AddbankPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: 'otcrecord',
    loadChildren: () => import('./otcrecord/otcrecord.module').then(m => m.OtcrecordPageModule)
  },
  {
    path: 'otclog',
    loadChildren: () => import('./otclog/otclog.module').then(m => m.OtclogPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: 'register2',
    loadChildren: () => import('./register2/register2.module').then(m => m.Register2PageModule)
  },
  {
    path: 'password-reset',
    loadChildren: () => import('./password-reset/password-reset.module').then(m => m.PasswordResetPageModule)
  },
  {
    path: 'enter-2fa',
    loadChildren: () => import('./enter-2fa/enter-2fa.module').then(m => m.Enter2faPageModule)
  },
  {
    path: 'login2',
    loadChildren: () => import('./login2/login2.module').then(m => m.Login2PageModule)
  },
  {
    path: 'security-center',
    loadChildren: () => import('./security-center/security-center.module').then(m => m.SecurityCenterPageModule)
  },
  {
    path: 'chat-support',
    loadChildren: () => import('./chat-support/chat-support.module').then(m => m.ChatSupportPageModule)
  },
  {
    path: 'mining',
    loadChildren: () => import('./mining/mining.module').then(m => m.MiningPageModule)
  },
  {
    path: 'mining-confirm-purchase',
    loadChildren: () => import('./mining-confirm-purchase/mining-confirm-purchase.module').then(m => m.MiningConfirmPurchasePageModule)
  },
  {
    path: 'mining-machines',
    loadChildren: () => import('./mining-machines/mining-machines.module').then(m => m.MiningMachinesPageModule)
  },
  {
    path: 'mining-rewards',
    loadChildren: () => import('./mining-rewards/mining-rewards.module').then(m => m.MiningRewardsPageModule)
  },
  {
    path: 'lab',
    loadChildren: () => import('./lab/lab.module').then(m => m.LabPageModule)
  },
  {
    path: 'lab-info',
    loadChildren: () => import('./lab-info/lab-info.module').then(m => m.LabInfoPageModule)
  },
  {
    path: 'lab-ico',
    loadChildren: () => import('./lab-ico/lab-ico.module').then(m => m.LabIcoPageModule)
  },
  {
    path: 'lab-history',
    loadChildren: () => import('./lab-history/lab-history.module').then(m => m.LabHistoryPageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then(m => m.StorePageModule)
  },
  {
    path: 'store-buy',
    loadChildren: () => import('./store-buy/store-buy.module').then(m => m.StoreBuyPageModule)
  },
  {
    path: 'store-addresses',
    loadChildren: () => import('./store-addresses/store-addresses.module').then(m => m.StoreAddressesPageModule)
  },
  {
    path: 'store-new-address',
    loadChildren: () => import('./store-new-address/store-new-address.module').then(m => m.StoreNewAddressPageModule)
  },
  {
    path: 'store-edit-address',
    loadChildren: () => import('./store-edit-address/store-edit-address.module').then(m => m.StoreEditAddressPageModule)
  },
  {
    path: 'store-orders',
    loadChildren: () => import('./store-orders/store-orders.module').then(m => m.StoreOrdersPageModule)
  },
  {
    path: 'otc-main',
    loadChildren: () => import('./otc-main/otc-main.module').then(m => m.OtcMainPageModule)
  },
  {
    path: 'otc-history',
    loadChildren: () => import('./otc-history/otc-history.module').then(m => m.OtcHistoryPageModule)
  },
  {
    path: 'otc-confirm',
    loadChildren: () => import('./otc-confirm/otc-confirm.module').then(m => m.OtcConfirmPageModule)
  },
  {
    path: 'convert',
    loadChildren: () => import('./convert/convert.module').then(m => m.ConvertPageModule)
  },
  {
    path: 'gift',
    loadChildren: () => import('./gift/gift.module').then(m => m.GiftPageModule)
  },
  {
    path: 'voting',
    loadChildren: () => import('./voting/voting.module').then(m => m.VotingPageModule)
  },
  {
    path: 'voting-info',
    loadChildren: () => import('./voting-info/voting-info.module').then(m => m.VotingInfoPageModule)
  },
  {
    path: 'fixing',
    loadChildren: () => import('./fixing/fixing.module').then(m => m.FixingPageModule)
  },
  {
    path: 'fixing-history',
    loadChildren: () => import('./fixing-history/fixing-history.module').then(m => m.FixingHistoryPageModule)
  },
  {
    path: 'airdrop',
    loadChildren: () => import('./airdrop/airdrop.module').then(m => m.AirdropPageModule)
  },
  {
    path: 'faucet',
    loadChildren: () => import('./faucet/faucet.module').then(m => m.FaucetPageModule)
  },
  {
    path: 'dex',
    loadChildren: () => import('./dex/dex.module').then(m => m.DexPageModule)
  },
  {
    path: 'dex-confirm',
    loadChildren: () => import('./dex-confirm/dex-confirm.module').then(m => m.DexConfirmPageModule)
  },
  {
    path: 'dex-history',
    loadChildren: () => import('./dex-history/dex-history.module').then(m => m.DexHistoryPageModule)
  },
  {
    path: 'fiat-deposit-new',
    loadChildren: () => import('./fiat-deposit-new/fiat-deposit-new.module').then(m => m.FiatDepositNewPageModule)
  },
  {
    path: 'p2p-faq',
    loadChildren: () => import('./p2p-faq/p2p-faq.module').then(m => m.P2pFaqPageModule)
  },
  {
    path: 'p2p-faq-details',
    loadChildren: () => import('./p2p-faq-details/p2p-faq-details.module').then(m => m.P2pFaqDetailsPageModule)
  },
  {
    path: 'p2p-merchant',
    loadChildren: () => import('./p2p-merchant/p2p-merchant.module').then(m => m.P2pMerchantPageModule)
  },
  {
    path: 'p2p-ads',
    loadChildren: () => import('./p2p-ads/p2p-ads.module').then(m => m.P2pAdsPageModule)
  },
  {
    path: 'p2p-payment-settings',
    loadChildren: () => import('./p2p-payment-settings/p2p-payment-settings.module').then(m => m.P2pPaymentSettingsPageModule)
  },
  {
    path: 'p2p-payment-method-new',
    loadChildren: () => import('./p2p-payment-method-new/p2p-payment-method-new.module').then(m => m.P2pPaymentMethodNewPageModule)
  },
  {
    path: 'p2p-orders',
    loadChildren: () => import('./p2p-orders/p2p-orders.module').then(m => m.P2pOrdersPageModule)
  },
  {
    path: 'p2p-order-info',
    loadChildren: () => import('./p2p-order-info/p2p-order-info.module').then(m => m.P2pOrderInfoPageModule)
  },
  {
    path: 'p2p-post-ad',
    loadChildren: () => import('./p2p-post-ad/p2p-post-ad.module').then(m => m.P2pPostAdPageModule)
  },
  {
    path: 'p2p-main',
    loadChildren: () => import('./p2p-main/p2p-main.module').then( m => m.P2pMainPageModule)
  },
  {
    path: 'p2p-main-express',
    loadChildren: () => import('./p2p-main-express/p2p-main-express.module').then( m => m.P2pMainExpressPageModule)
  },
  {
    path: 'p2p-main-payment-method',
    loadChildren: () => import('./p2p-main-payment-method/p2p-main-payment-method.module').then( m => m.P2pMainPaymentMethodPageModule)
  },
  {
    path: 'p2p-buy',
    loadChildren: () => import('./p2p-buy/p2p-buy.module').then( m => m.P2pBuyPageModule)
  },
  {
    path: 'p2p-buy-pay',
    loadChildren: () => import('./p2p-buy-pay/p2p-buy-pay.module').then( m => m.P2pBuyPayPageModule)
  },
  {
    path: 'p2p-buy-pay-cancel',
    loadChildren: () => import('./p2p-buy-pay-cancel/p2p-buy-pay-cancel.module').then( m => m.P2pBuyPayCancelPageModule)
  },
  {
    path: 'p2p-buy-pay-done',
    loadChildren: () => import('./p2p-buy-pay-done/p2p-buy-pay-done.module').then( m => m.P2pBuyPayDonePageModule)
  },
  {
    path: 'wallet-transfer',
    loadChildren: () => import('./wallet-transfer/wallet-transfer.module').then( m => m.WalletTransferPageModule)
  },
  {
    path: 'wallet-transfer-history',
    loadChildren: () => import('./wallet-transfer-history/wallet-transfer-history.module').then( m => m.WalletTransferHistoryPageModule)
  },
  {
    path: 'loading-skeleton',
    loadChildren: () => import('./loading-skeleton/loading-skeleton.module').then( m => m.LoadingSkeletonPageModule)
  },
  {
    path: 'faucet-logs',
    loadChildren: () => import('./faucet-logs/faucet-logs.module').then( m => m.FaucetLogsPageModule)
  },
  {
    path: 'freeze',
    loadChildren: () => import('./freeze/freeze.module').then( m => m.FreezePageModule)
  },
  {
    path: 'anti-fishing',
    loadChildren: () => import('./anti-fishing/anti-fishing.module').then( m => m.AntiFishingPageModule)
  },
  {
    path: 'google-2fa',
    loadChildren: () => import('./google-2fa/google-2fa.module').then( m => m.Google2FaPageModule)
  },
  {
    path: 'p2p-chat',
    loadChildren: () => import('./p2p-chat/p2p-chat.module').then( m => m.P2pChatPageModule)
  },
  {
    path: 'article-view',
    loadChildren: () => import('./article-view/article-view.module').then( m => m.ArticleViewPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
