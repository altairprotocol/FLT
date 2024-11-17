import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiatDepositPage } from './fiat-deposit.page';

describe('FiatDepositPage', () => {
  let component: FiatDepositPage;
  let fixture: ComponentFixture<FiatDepositPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FiatDepositPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
