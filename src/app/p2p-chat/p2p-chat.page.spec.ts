import { ComponentFixture, TestBed } from '@angular/core/testing';
import { P2pChatPage } from './p2p-chat.page';

describe('P2pChatPage', () => {
  let component: P2pChatPage;
  let fixture: ComponentFixture<P2pChatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(P2pChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
