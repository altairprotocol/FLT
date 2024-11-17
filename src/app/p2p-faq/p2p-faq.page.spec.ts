import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pFaqPage } from './p2p-faq.page';

describe('P2pFaqPage', () => {
  let component: P2pFaqPage;
  let fixture: ComponentFixture<P2pFaqPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pFaqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
