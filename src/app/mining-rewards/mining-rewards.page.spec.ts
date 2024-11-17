import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiningRewardsPage } from './mining-rewards.page';

describe('MiningRewardsPage', () => {
  let component: MiningRewardsPage;
  let fixture: ComponentFixture<MiningRewardsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningRewardsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
