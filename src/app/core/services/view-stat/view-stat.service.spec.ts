import { TestBed } from '@angular/core/testing';

import { ViewStatService } from './view-stat.service';

describe('ViewStatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewStatService = TestBed.get(ViewStatService);
    expect(service).toBeTruthy();
  });
});
