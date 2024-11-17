import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DexHistoryPage } from './dex-history.page';

describe('DexHistoryPage', () => {
  let component: DexHistoryPage;
  let fixture: ComponentFixture<DexHistoryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DexHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
