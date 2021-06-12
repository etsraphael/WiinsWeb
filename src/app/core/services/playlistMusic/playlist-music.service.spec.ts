import { TestBed } from '@angular/core/testing';

import { PlaylistMusicService } from './playlist-music.service';

describe('PlaylistMusicService', () => {
  let service: PlaylistMusicService
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
