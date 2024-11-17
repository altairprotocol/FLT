import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WithdrawalDetailPage } from './withdrawal-detail.page';

describe('WithdrawalDetailPage', () => {
  let component: WithdrawalDetailPage;
  let fixture: ComponentFixture<WithdrawalDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawalDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
