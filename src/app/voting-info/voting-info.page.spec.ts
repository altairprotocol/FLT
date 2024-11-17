import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotingInfoPage } from './voting-info.page';

describe('VotingInfoPage', () => {
  let component: VotingInfoPage;
  let fixture: ComponentFixture<VotingInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VotingInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
