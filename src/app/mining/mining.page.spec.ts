import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiningPage } from './mining.page';

describe('MiningPage', () => {
  let component: MiningPage;
  let fixture: ComponentFixture<MiningPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiningPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
