import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pMerchantPage } from './p2p-merchant.page';

describe('P2pMerchantPage', () => {
  let component: P2pMerchantPage;
  let fixture: ComponentFixture<P2pMerchantPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pMerchantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
