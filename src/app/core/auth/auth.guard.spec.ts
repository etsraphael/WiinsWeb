import { TestBed } from '@angular/core/testing';
import { AuthGuard } from './auth.guard';

describe('AlertService', () => {
  let service: AuthGuard
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});