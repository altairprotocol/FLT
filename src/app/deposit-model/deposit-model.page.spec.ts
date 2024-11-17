import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepositModelPage } from './deposit-model.page';

describe('DepositModelPage', () => {
  let component: DepositModelPage;
  let fixture: ComponentFixture<DepositModelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
