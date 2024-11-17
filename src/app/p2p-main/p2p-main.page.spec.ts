import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pMainPage } from './p2p-main.page';

describe('P2pMainPage', () => {
  let component: P2pMainPage;
  let fixture: ComponentFixture<P2pMainPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
