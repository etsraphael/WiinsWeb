import { TestBed } from '@angular/core/testing';
import { ActivityService } from './activity.service';

describe('ActivityService', () => {
  let service: ActivityService;
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
