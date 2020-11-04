import { TestBed } from '@angular/core/testing';

import { CryptoServiceService } from './crypto-service.service';

describe('CryptoServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CryptoServiceService = TestBed.get(CryptoServiceService);
    expect(service).toBeTruthy();
  });
});
