import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreEditAddressPage } from './store-edit-address.page';

describe('StoreEditAddressPage', () => {
  let component: StoreEditAddressPage;
  let fixture: ComponentFixture<StoreEditAddressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
