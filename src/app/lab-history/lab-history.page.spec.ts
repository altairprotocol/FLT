import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabHistoryPage } from './lab-history.page';

describe('LabHistoryPage', () => {
  let component: LabHistoryPage;
  let fixture: ComponentFixture<LabHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LabHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
