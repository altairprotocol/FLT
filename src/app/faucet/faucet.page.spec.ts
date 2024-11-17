import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaucetPage } from './faucet.page';

describe('FaucetPage', () => {
  let component: FaucetPage;
  let fixture: ComponentFixture<FaucetPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FaucetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
