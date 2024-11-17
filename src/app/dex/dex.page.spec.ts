import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DexPage } from './dex.page';

describe('DexPage', () => {
  let component: DexPage;
  let fixture: ComponentFixture<DexPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
