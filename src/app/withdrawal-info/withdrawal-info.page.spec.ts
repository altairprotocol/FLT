import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WithdrawalInfoPage } from './withdrawal-info.page';

describe('WithdrawalInfoPage', () => {
  let component: WithdrawalInfoPage;
  let fixture: ComponentFixture<WithdrawalInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
