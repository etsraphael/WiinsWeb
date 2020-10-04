import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PlayerMusicStoreSelectors, PlayerMusicStoreActions, MyMusicLikedStoreActions } from '../../root-store';
import { skipWhile, filter, distinctUntilChanged } from 'rxjs/operators';
import { Music } from '../../core/models/publication/music/music.model';
import { ControlMusicService } from 'src/app/core/services/control-music/control-music.service';

@Component({
  selector: 'app-mini-player-music',
  templateUrl: './mini-player-music.component.html',
  styleUrls: ['./mini-player-music.component.scss']
})

export class MiniPlayerMusicComponent implements OnInit, OnDestroy {

  // controls
  musicPlaying$: Observable<Boolean>
  musicList$: Observable<Music[]>
  audio$: Observable<Music>
  command$: Observable<string>
  SubMusicPlaying: Subscription

  // progress bar
  progress: number = 0
  duration: number = 0

  @ViewChild('currentMusic', { static: false }) audioRef: ElementRef;

  constructor(
    private store$: Store<RootStoreState.State>,
    public controlMusicService: ControlMusicService,
  ) { }

  ngOnInit() {

    // to add action during the music is playing
    this.listenerControlMusic()

    // to select if the music was choosen
    this.musicPlaying$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectIfPlaying),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to select all the music in the list
    this.musicList$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectMusicList),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to know if a music is playing
    this.audio$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectMusicIsPlaying),
      distinctUntilChanged(),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to controls the music
    this.command$ = this.store$.pipe(
      select(PlayerMusicStoreSelectors.selectCommand),
      filter(value => (value !== undefined) && (value !== null)),
    )

    // to do somes actions for each command
    this.SubMusicPlaying = this.command$.subscribe(action => {
      switch (action) {
        case 'continue':
          this.audioRef.nativeElement.play()
          this.store$.dispatch(new PlayerMusicStoreActions.Continue)
          break;
        case 'pause': 
          this.audioRef.nativeElement.pause()
          this.store$.dispatch(new PlayerMusicStoreActions.Pause)
          break;
        default: break;
      }
      // reset the command
      this.store$.dispatch(new PlayerMusicStoreActions.Command(null))
    })

  }

  listenerControlMusic(): void {
    // set the progress bar
    setTimeout(() => { this.listenerTime() }, 1000);
  }

  listenerTime() {
    // get the current time for the progress bar
    return this.audioRef.nativeElement.addEventListener('timeupdate', (data: any) => {
      this.progress = Math.round((data.target.currentTime / data.target.duration) * 100)
    })
  }

  like(music: Music) {

    // save the music
    if (music.isLiked == false) {
      this.store$.dispatch(new MyMusicLikedStoreActions.LikeMusic(music))
      this.store$.dispatch(new PlayerMusicStoreActions.UpdateMusicLike(music._id))
    } 
    // delete the music
    else {
      this.store$.dispatch(new MyMusicLikedStoreActions.DisLikeMusic(music))
      this.store$.dispatch(new PlayerMusicStoreActions.UpdateMusicDisLike(music._id))
    }

  }

  ngOnDestroy(): void {
    // unsubscribe all var
    if(this.SubMusicPlaying) this.SubMusicPlaying.unsubscribe()
  }

}
