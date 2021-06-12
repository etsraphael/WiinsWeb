import { TestBed } from '@angular/core/testing';
import { GroupService } from './group.service';

describe('GroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    let service: GroupService
    expect(service).toBeTruthy();
  });
});
