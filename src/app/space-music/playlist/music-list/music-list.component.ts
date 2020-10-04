import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PlaylistMusicByIdStoreSelectors, PlayerMusicStoreSelectors, MyMusicLikedStoreActions, PlaylistMusicByIdStoreActions } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { skipWhile, filter, distinctUntilChanged } from 'rxjs/operators';
import { Playlist } from 'src/app/core/models/music/playlist.model';
import { Music } from 'src/app/core/models/publication/music/music.model';
import { ControlMusicService } from 'src/app/core/services/control-music/control-music.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.scss']
})

export class MusicListComponent implements OnInit {

  // music list
  musicList$: Observable<Playlist>;

  // logo play
  audioPlaying$: Observable<Music>;
  musicPlaying$: Observable<Boolean>;

  constructor(
    private store$: Store<RootStoreState.State>,
    public controlMusicService: ControlMusicService,
  ) { }

  ngOnInit() {

    // to select the music list
    this.musicList$ = this.store$.pipe(
      select(PlaylistMusicByIdStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    )

    // to if a music was chosen
    this.audioPlaying$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectMusicIsPlaying),
      distinctUntilChanged(),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to know if the music is playling
    this.musicPlaying$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectIfPlaying),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

  }

  like(music: Music) {

    // to save a music
    if (music.isLiked == false) {
      this.store$.dispatch(new MyMusicLikedStoreActions.LikeMusic(music))
      this.store$.dispatch(new PlaylistMusicByIdStoreActions.UpdateMusicLike(music))
    } 
    // to dislike a music
    else {
      this.store$.dispatch(new MyMusicLikedStoreActions.DisLikeMusic(music))
      this.store$.dispatch(new PlaylistMusicByIdStoreActions.UpdateMusicDisLike(music))
    }
    
  }

}
