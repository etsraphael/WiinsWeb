import { TestBed } from '@angular/core/testing';

import { MessengerService } from './messenger.service';

describe('MessengerService', () => {
  let service: MessengerService
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
