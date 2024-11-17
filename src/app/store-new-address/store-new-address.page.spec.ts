import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreNewAddressPage } from './store-new-address.page';

describe('StoreNewAddressPage', () => {
  let component: StoreNewAddressPage;
  let fixture: ComponentFixture<StoreNewAddressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreNewAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
