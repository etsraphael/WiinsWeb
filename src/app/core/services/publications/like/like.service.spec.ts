import { TestBed } from '@angular/core/testing';
import { LikeService } from './like.service';

describe('LikeService', () => {
  let service: LikeService
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
