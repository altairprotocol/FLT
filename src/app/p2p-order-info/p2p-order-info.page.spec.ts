import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pOrderInfoPage } from './p2p-order-info.page';

describe('P2pOrderInfoPage', () => {
  let component: P2pOrderInfoPage;
  let fixture: ComponentFixture<P2pOrderInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pOrderInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
