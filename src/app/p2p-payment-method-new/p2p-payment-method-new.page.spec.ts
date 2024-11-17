import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pPaymentMethodNewPage } from './p2p-payment-method-new.page';

describe('P2pPaymentMethodNewPage', () => {
  let component: P2pPaymentMethodNewPage;
  let fixture: ComponentFixture<P2pPaymentMethodNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pPaymentMethodNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
