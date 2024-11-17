import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pOrdersPage } from './p2p-orders.page';

describe('P2pOrdersPage', () => {
  let component: P2pOrdersPage;
  let fixture: ComponentFixture<P2pOrdersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pOrdersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
