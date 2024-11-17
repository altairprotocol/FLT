import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AirdropPage } from './airdrop.page';

describe('AirdropPage', () => {
  let component: AirdropPage;
  let fixture: ComponentFixture<AirdropPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AirdropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
