import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OtcrecordPage } from './otcrecord.page';

describe('OtcrecordPage', () => {
  let component: OtcrecordPage;
  let fixture: ComponentFixture<OtcrecordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OtcrecordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
