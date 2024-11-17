import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtclogPage } from './otclog.page';

describe('OtclogPage', () => {
  let component: OtclogPage;
  let fixture: ComponentFixture<OtclogPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtclogPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
