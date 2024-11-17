import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Google2FaPage } from './google-2fa.page';

describe('Google2FaPage', () => {
  let component: Google2FaPage;
  let fixture: ComponentFixture<Google2FaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Google2FaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
