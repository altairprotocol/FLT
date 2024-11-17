import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiatDepositNewPage } from './fiat-deposit-new.page';

describe('FiatDepositNewPage', () => {
  let component: FiatDepositNewPage;
  let fixture: ComponentFixture<FiatDepositNewPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FiatDepositNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
