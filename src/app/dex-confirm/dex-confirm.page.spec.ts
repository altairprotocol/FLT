import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DexConfirmPage } from './dex-confirm.page';

describe('DexConfirmPage', () => {
  let component: DexConfirmPage;
  let fixture: ComponentFixture<DexConfirmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DexConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
