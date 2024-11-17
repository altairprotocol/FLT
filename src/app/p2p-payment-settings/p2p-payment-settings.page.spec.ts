import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pPaymentSettingsPage } from './p2p-payment-settings.page';

describe('P2pPaymentSettingsPage', () => {
  let component: P2pPaymentSettingsPage;
  let fixture: ComponentFixture<P2pPaymentSettingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pPaymentSettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
