import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LabPage } from './lab.page';

describe('LabPage', () => {
  let component: LabPage;
  let fixture: ComponentFixture<LabPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
