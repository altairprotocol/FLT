import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtcMainPage } from './otc-main.page';

describe('OtcMainPage', () => {
  let component: OtcMainPage;
  let fixture: ComponentFixture<OtcMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
