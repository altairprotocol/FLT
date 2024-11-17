import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FixingHistoryPage } from './fixing-history.page';

describe('FixingHistoryPage', () => {
  let component: FixingHistoryPage;
  let fixture: ComponentFixture<FixingHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FixingHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
