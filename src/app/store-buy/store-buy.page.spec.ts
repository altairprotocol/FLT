import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreBuyPage } from './store-buy.page';

describe('StoreBuyPage', () => {
  let component: StoreBuyPage;
  let fixture: ComponentFixture<StoreBuyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreBuyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
