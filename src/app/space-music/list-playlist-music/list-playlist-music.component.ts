import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PlaylistsMusicStoreActions, PlaylistsMusicStoreSelectors } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { Playlist } from 'src/app/core/models/music/playlist.model';
import { skipWhile, filter } from 'rxjs/operators';

@Component({
  selector: 'app-list-playlist-music',
  templateUrl: './list-playlist-music.component.html',
  styleUrls: ['./list-playlist-music.component.scss']
})

export class ListPlaylistMusicComponent implements OnInit {


  // playlist
  playlists$: Observable<Playlist[]>
  currentPage = 0
  playlistType: string

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {

    // to select the name of the playlist
    this.playlistType = this.route.snapshot.paramMap.get('name')
    
    // to reset the page
    this.store$.dispatch(new PlaylistsMusicStoreActions.resetListPlaylist)
    this.store$.dispatch(new PlaylistsMusicStoreActions.LoadPlaylists(this.playlistType, ++this.currentPage))

    // to select the page
    this.playlists$ = this.store$.pipe(
      select(PlaylistsMusicStoreSelectors.selectAllPlaylist),
      filter(value => value !== undefined),
      skipWhile(val => val.length == 0)
    )

  }

  onScroll(){
    // to load the next page
    this.store$.dispatch(new PlaylistsMusicStoreActions.LoadPlaylists(this.playlistType, ++this.currentPage))
  }

}
