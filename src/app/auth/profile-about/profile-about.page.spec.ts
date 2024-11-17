import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileAboutPage } from './profile-about.page';

describe('ProfileAboutPage', () => {
  let component: ProfileAboutPage;
  let fixture: ComponentFixture<ProfileAboutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
