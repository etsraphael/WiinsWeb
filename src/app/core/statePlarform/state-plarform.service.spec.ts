import { TestBed } from '@angular/core/testing';

import { StatePlarformService } from './state-plarform.service';

describe('StatePlarformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatePlarformService = TestBed.get(StatePlarformService);
    expect(service).toBeTruthy();
  });
});
