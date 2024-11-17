import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtcConfirmPage } from './otc-confirm.page';

describe('OtcConfirmPage', () => {
  let component: OtcConfirmPage;
  let fixture: ComponentFixture<OtcConfirmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
