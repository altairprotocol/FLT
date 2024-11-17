import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pMainPaymentMethodPage } from './p2p-main-payment-method.page';

describe('P2pMainPaymentMethodPage', () => {
  let component: P2pMainPaymentMethodPage;
  let fixture: ComponentFixture<P2pMainPaymentMethodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pMainPaymentMethodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
