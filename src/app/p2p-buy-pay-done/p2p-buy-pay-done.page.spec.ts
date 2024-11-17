import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pBuyPayDonePage } from './p2p-buy-pay-done.page';

describe('P2pBuyPayDonePage', () => {
  let component: P2pBuyPayDonePage;
  let fixture: ComponentFixture<P2pBuyPayDonePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pBuyPayDonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
