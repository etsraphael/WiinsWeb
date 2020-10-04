import { TestBed } from '@angular/core/testing';

import { PlaylistMusicService } from './playlist-music.service';

describe('PlaylistMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaylistMusicService = TestBed.get(PlaylistMusicService);
    expect(service).toBeTruthy();
  });
});
