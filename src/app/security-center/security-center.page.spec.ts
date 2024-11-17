import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityCenterPage } from './security-center.page';

describe('SecurityCenterPage', () => {
  let component: SecurityCenterPage;
  let fixture: ComponentFixture<SecurityCenterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityCenterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
