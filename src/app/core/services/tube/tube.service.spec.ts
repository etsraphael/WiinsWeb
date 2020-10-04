import { TestBed } from '@angular/core/testing';

import { TubeService } from './tube.service';

describe('TubeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TubeService = TestBed.get(TubeService);
    expect(service).toBeTruthy();
  });
});
