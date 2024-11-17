import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AntiFishingPage } from './anti-fishing.page';

describe('AntiFishingPage', () => {
  let component: AntiFishingPage;
  let fixture: ComponentFixture<AntiFishingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiFishingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
