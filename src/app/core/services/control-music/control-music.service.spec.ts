import { TestBed } from '@angular/core/testing';
import { ControlMusicService } from './control-music.service';

describe('ControlMusicService', () => {
  let service: ControlMusicService
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
