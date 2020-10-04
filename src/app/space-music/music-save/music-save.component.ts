import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { RootStoreState, MyMusicLikedStoreActions, MyMusicLikedStoreSelectors, PlayerMusicStoreSelectors, PlayerMusicStoreActions } from 'src/app/root-store'
import { Observable, Subscription } from 'rxjs';
import { Music } from 'src/app/core/models/publication/music/music.model';
import { skipWhile, distinctUntilChanged, filter } from 'rxjs/operators';
import { ControlMusicService } from 'src/app/core/services/control-music/control-music.service';


@Component({
  selector: 'app-music-save',
  templateUrl: './music-save.component.html',
  styleUrls: ['./music-save.component.scss']
})

export class MusicSaveComponent implements OnInit {

  // music list
  musicList$: Observable<Music[]>

  // logo play
  audioPlayingSubscription: Subscription
  audioPlaying$: Observable<Music>
  musicPlaying$: Observable<Boolean>

  constructor(
    public controlMusicService: ControlMusicService,
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit() {

    // to load the fav music
    this.store$.dispatch(new MyMusicLikedStoreActions.LoadMyMusic)

    // to select fav music
    this.musicList$ = this.store$.pipe(
      select(MyMusicLikedStoreSelectors.select),
      skipWhile(val => val === null),
      filter(val => !!val)
    )

    // to know if a music was chosen
    this.audioPlaying$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectMusicIsPlaying),
      distinctUntilChanged(),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to know if music is playing
    this.musicPlaying$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectIfPlaying),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

  }

  delete(music: Music) {
    // to pull a music in the list
    this.store$.dispatch(new MyMusicLikedStoreActions.DisLikeMusic(music))
  }

}
