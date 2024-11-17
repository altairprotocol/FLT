import { TestBed } from '@angular/core/testing';

import { CodonoService } from './codono.service';

describe('CodonoService', () => {
  let service: CodonoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodonoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
