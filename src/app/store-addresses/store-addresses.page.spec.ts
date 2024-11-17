import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreAddressesPage } from './store-addresses.page';

describe('StoreAddressesPage', () => {
  let component: StoreAddressesPage;
  let fixture: ComponentFixture<StoreAddressesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreAddressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
