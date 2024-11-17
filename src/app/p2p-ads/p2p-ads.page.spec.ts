import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pAdsPage } from './p2p-ads.page';

describe('P2pAdsPage', () => {
  let component: P2pAdsPage;
  let fixture: ComponentFixture<P2pAdsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pAdsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
