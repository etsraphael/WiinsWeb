import { Component, OnInit } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { RootStoreState, PlaylistMusicStoreActions, PlaylistMusicStoreSelectors } from 'src/app/root-store'
import { Observable } from 'rxjs'
import { skipWhile, filter } from 'rxjs/operators'
import { MenuPlaylistModel } from 'src/app/core/models/music/menuplaylist.model'

@Component({
  selector: 'app-music-main',
  templateUrl: './music-main.component.html',
  styleUrls: ['./music-main.component.scss']
})

export class MusicMainComponent implements OnInit {

  // menu playlist
  menuPlaylist$: Observable<MenuPlaylistModel>;


  constructor(
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {

    // to load the playlist menu
    this.store$.dispatch(new PlaylistMusicStoreActions.LoadPlaylistMenu)

    // to select the playlist menu
    this.menuPlaylist$ = this.store$.pipe(
      select(PlaylistMusicStoreSelectors.selectMenu),
      skipWhile(val => val == null),
      filter(value => value !== undefined)
    )

  }
  
}
