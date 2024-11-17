import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FixingPage } from './fixing.page';

describe('FixingPage', () => {
  let component: FixingPage;
  let fixture: ComponentFixture<FixingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FixingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
