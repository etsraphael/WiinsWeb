import { TestBed } from '@angular/core/testing';
import { FeedService } from './feed.service';

describe('FeedService', () => {
  let service: FeedService
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
