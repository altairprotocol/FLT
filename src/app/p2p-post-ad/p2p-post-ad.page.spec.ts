import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pPostAdPage } from './p2p-post-ad.page';

describe('P2pPostAdPage', () => {
  let component: P2pPostAdPage;
  let fixture: ComponentFixture<P2pPostAdPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pPostAdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
