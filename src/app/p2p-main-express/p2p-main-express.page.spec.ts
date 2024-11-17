import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pMainExpressPage } from './p2p-main-express.page';

describe('P2pMainExpressPage', () => {
  let component: P2pMainExpressPage;
  let fixture: ComponentFixture<P2pMainExpressPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pMainExpressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
