import { Playlist } from 'src/app/core/models/music/playlist.model';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PlaylistMusicByIdStoreActions, PlaylistMusicByIdStoreSelectors, PlayerMusicStoreSelectors } from 'src/app/root-store';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { skipWhile, filter } from 'rxjs/operators';
import { Music } from 'src/app/core/models/publication/music/music.model';
import { MusicAnimation } from 'src/assets/route-animation/music-animation';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
  animations: [MusicAnimation]
})

export class PlaylistComponent implements OnInit {

  // playlist
  playlistId: string;
  playlist$: Observable<Playlist>;
  musicList$: Observable<Music[]>;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {

    // to load the playlist
    this.playlistId = this.route.snapshot.paramMap.get('id')
    this.store$.dispatch(new PlaylistMusicByIdStoreActions.LoadPlaylistById(this.playlistId))

    // to select the playlist
    this.playlist$ = this.store$.pipe(
      select(PlaylistMusicByIdStoreSelectors.select),
      skipWhile(val => val === null)
    )

    // to know the music was chosen
    this.musicList$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectMusicList),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    )

  }

}
