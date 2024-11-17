import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiningMachinesPage } from './mining-machines.page';

describe('MiningMachinesPage', () => {
  let component: MiningMachinesPage;
  let fixture: ComponentFixture<MiningMachinesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningMachinesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
