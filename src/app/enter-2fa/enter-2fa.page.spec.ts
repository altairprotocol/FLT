import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Enter2faPage } from './enter-2fa.page';

describe('Enter2faPage', () => {
  let component: Enter2faPage;
  let fixture: ComponentFixture<Enter2faPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Enter2faPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
