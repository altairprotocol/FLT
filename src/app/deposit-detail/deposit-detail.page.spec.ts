import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositDetailPage } from './deposit-detail.page';

describe('DepositDetailPage', () => {
  let component: DepositDetailPage;
  let fixture: ComponentFixture<DepositDetailPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
