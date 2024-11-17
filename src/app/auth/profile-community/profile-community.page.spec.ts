import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCommunityPage } from './profile-community.page';

describe('ProfileCommunityPage', () => {
  let component: ProfileCommunityPage;
  let fixture: ComponentFixture<ProfileCommunityPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCommunityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
