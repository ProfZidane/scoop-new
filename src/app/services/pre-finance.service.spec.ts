import { TestBed } from '@angular/core/testing';

import { PreFinanceService } from './pre-finance.service';

describe('PreFinanceService', () => {
  let service: PreFinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreFinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
