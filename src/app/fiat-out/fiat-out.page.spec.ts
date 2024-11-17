import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiatOutPage } from './fiat-out.page';

describe('FiatOutPage', () => {
  let component: FiatOutPage;
  let fixture: ComponentFixture<FiatOutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FiatOutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
