import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreezePage } from './freeze.page';

describe('FreezePage', () => {
  let component: FreezePage;
  let fixture: ComponentFixture<FreezePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FreezePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
