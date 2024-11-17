import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pBuyPage } from './p2p-buy.page';

describe('P2pBuyPage', () => {
  let component: P2pBuyPage;
  let fixture: ComponentFixture<P2pBuyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pBuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
