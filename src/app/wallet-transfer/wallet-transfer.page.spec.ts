import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletTransferPage } from './wallet-transfer.page';

describe('WalletTransferPage', () => {
  let component: WalletTransferPage;
  let fixture: ComponentFixture<WalletTransferPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletTransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
