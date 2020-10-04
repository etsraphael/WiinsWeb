import { Injectable } from '@angular/core'
import { Music } from '../../models/publication/music/music.model'
import { Store, select } from '@ngrx/store'
import { RootStoreState, PlayerMusicStoreSelectors, PlayerMusicStoreActions } from 'src/app/root-store'
import { take } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })

export class ControlMusicService {

  constructor(
    private store$: Store<RootStoreState.State>
  ) { }

  play(music: Music, musicList: Music[]) {

    this.store$.pipe(
      take(1),
      select(PlayerMusicStoreSelectors.selectMusicIsPlaying)
    ).subscribe(action => {

      // if it's the same
      if (!!action && action._id == music._id) {
        this.store$.dispatch(new PlayerMusicStoreActions.Command('continue'))
      }
      // if it's not the same
      if (!!action && action._id !== music._id) {
        this.store$.dispatch(new PlayerMusicStoreActions.Reset)
        setTimeout(() => this.store$.dispatch(new PlayerMusicStoreActions.PlayFromLink(music, musicList)), 1000)
      }
      // if it's the the first
      else this.store$.dispatch(new PlayerMusicStoreActions.PlayFromLink(music, musicList))
    })
  }

  pause() {
    this.store$.dispatch(new PlayerMusicStoreActions.Command('pause'))
  }

  next(music: Music, musicList: Music[]) {
    const foundInPlaylist = musicList.indexOf(music)
    if ((foundInPlaylist + 1) > (musicList.length - 1)) return null
    this.store$.dispatch(new PlayerMusicStoreActions.Reset)
    setTimeout(() => this.store$.dispatch(new PlayerMusicStoreActions.PlayFromLink(musicList[foundInPlaylist + 1], musicList)), 1000)
  }

  previous(music: Music, musicList: Music[], progress: number) {
    if (progress > 4) return this.restart(music, musicList)
    const foundInPlaylist = musicList.indexOf(music)
    if ((foundInPlaylist - 1) < 0) return null
    this.store$.dispatch(new PlayerMusicStoreActions.Reset)
    setTimeout(() => this.store$.dispatch(new PlayerMusicStoreActions.PlayFromLink(musicList[foundInPlaylist - 1], musicList)), 1000)
  }

  continue() {
    this.store$.dispatch(new PlayerMusicStoreActions.Command('continue'))
  }

  restart(music: Music, musicList: Music[]) {
    this.store$.dispatch(new PlayerMusicStoreActions.Reset)
    setTimeout(() => this.store$.dispatch(new PlayerMusicStoreActions.PlayFromLink(music, musicList)), 1000)
  }

}