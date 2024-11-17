import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiatHistoryPage } from './fiat-history.page';

describe('FiatHistoryPage', () => {
  let component: FiatHistoryPage;
  let fixture: ComponentFixture<FiatHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FiatHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
