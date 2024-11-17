import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiningConfirmPurchasePage } from './mining-confirm-purchase.page';

describe('MiningConfirmPurchasePage', () => {
  let component: MiningConfirmPurchasePage;
  let fixture: ComponentFixture<MiningConfirmPurchasePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningConfirmPurchasePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
