import { TestBed } from '@angular/core/testing';
import { CryptoServiceService } from './crypto-service.service';

describe('CryptoServiceService', () => {
  let service: CryptoServiceService
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
