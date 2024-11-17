import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pFaqDetailsPage } from './p2p-faq-details.page';

describe('P2pFaqDetailsPage', () => {
  let component: P2pFaqDetailsPage;
  let fixture: ComponentFixture<P2pFaqDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pFaqDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
