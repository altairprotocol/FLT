import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSkeletonPage } from './loading-skeleton.page';

describe('LoadingSkeletonPage', () => {
  let component: LoadingSkeletonPage;
  let fixture: ComponentFixture<LoadingSkeletonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingSkeletonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
