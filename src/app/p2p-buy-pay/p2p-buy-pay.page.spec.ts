import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pBuyPayPage } from './p2p-buy-pay.page';

describe('P2pBuyPayPage', () => {
  let component: P2pBuyPayPage;
  let fixture: ComponentFixture<P2pBuyPayPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pBuyPayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
