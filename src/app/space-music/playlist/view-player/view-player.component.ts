import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PlayerMusicStoreSelectors, PlayerMusicStoreActions } from 'src/app/root-store';
import { skipWhile, filter } from 'rxjs/operators';
import { Music } from 'src/app/core/models/publication/music/music.model';
import { ControlMusicService } from 'src/app/core/services/control-music/control-music.service';

@Component({
  selector: 'app-view-player',
  templateUrl: './view-player.component.html',
  styleUrls: ['./view-player.component.scss']
})

export class ViewPlayerComponent implements OnInit {

  // controls
  musicPlaying$: Observable<Boolean>;
  musicList$: Observable<Music[]>;
  audio$: Observable<Music>;

  constructor(
    private store$: Store<RootStoreState.State>,
    public controlMusicService: ControlMusicService
  ) { }

  ngOnInit() {

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
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )
    
  }


  next(music: Music, musicList: Music[]) {
    // to play the next music
    const foundInPlaylist = musicList.indexOf(music);
    if ((foundInPlaylist + 1) > (musicList.length - 1)) {
      return null;
    }
    this.store$.dispatch(new PlayerMusicStoreActions.Next(musicList[foundInPlaylist + 1]));
  }

  previous(music: Music, musicList: Music[]) {
    // to play the previous  music
    const foundInPlaylist = musicList.indexOf(music);
    if (foundInPlaylist === 0) return null
    this.store$.dispatch(new PlayerMusicStoreActions.Previous(musicList[foundInPlaylist - 1]));
  }

}
