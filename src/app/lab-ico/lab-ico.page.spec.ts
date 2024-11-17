import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabIcoPage } from './lab-ico.page';

describe('LabIcoPage', () => {
  let component: LabIcoPage;
  let fixture: ComponentFixture<LabIcoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LabIcoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
