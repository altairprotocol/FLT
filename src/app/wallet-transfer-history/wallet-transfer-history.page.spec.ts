import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletTransferHistoryPage } from './wallet-transfer-history.page';

describe('WalletTransferHistoryPage', () => {
  let component: WalletTransferHistoryPage;
  let fixture: ComponentFixture<WalletTransferHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletTransferHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
