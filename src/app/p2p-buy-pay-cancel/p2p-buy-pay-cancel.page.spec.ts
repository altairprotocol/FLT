import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pBuyPayCancelPage } from './p2p-buy-pay-cancel.page';

describe('P2pBuyPayCancelPage', () => {
  let component: P2pBuyPayCancelPage;
  let fixture: ComponentFixture<P2pBuyPayCancelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pBuyPayCancelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
