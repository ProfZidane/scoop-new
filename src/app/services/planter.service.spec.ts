import { TestBed } from '@angular/core/testing';

import { PlanterService } from './planter.service';

describe('PlanterService', () => {
  let service: PlanterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
