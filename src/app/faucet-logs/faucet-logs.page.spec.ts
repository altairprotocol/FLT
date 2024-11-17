import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FaucetLogsPage } from './faucet-logs.page';

describe('FaucetLogsPage', () => {
  let component: FaucetLogsPage;
  let fixture: ComponentFixture<FaucetLogsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FaucetLogsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
