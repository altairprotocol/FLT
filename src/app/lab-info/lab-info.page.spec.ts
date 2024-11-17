import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabInfoPage } from './lab-info.page';

describe('LabInfoPage', () => {
  let component: LabInfoPage;
  let fixture: ComponentFixture<LabInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LabInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
