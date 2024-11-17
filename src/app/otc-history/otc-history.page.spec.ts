import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtcHistoryPage } from './otc-history.page';

describe('OtcHistoryPage', () => {
  let component: OtcHistoryPage;
  let fixture: ComponentFixture<OtcHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
