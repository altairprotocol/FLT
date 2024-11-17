import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositInfoPage } from './deposit-info.page';

describe('DepositInfoPage', () => {
  let component: DepositInfoPage;
  let fixture: ComponentFixture<DepositInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
