import { TestBed } from '@angular/core/testing';

import { ControlMusicService } from './control-music.service';

describe('ControlMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ControlMusicService = TestBed.get(ControlMusicService);
    expect(service).toBeTruthy();
  });
});
