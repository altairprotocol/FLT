import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchWalletPage } from './search-wallet.page';

describe('SearchWalletPage', () => {
  let component: SearchWalletPage;
  let fixture: ComponentFixture<SearchWalletPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
