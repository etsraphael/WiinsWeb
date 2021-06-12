import { TestBed } from '@angular/core/testing';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
