import { Playlist } from './../../core/models/music/playlist.model'
import { Action } from '@ngrx/store'
import { MenuPlaylistModel } from 'src/app/core/models/music/menuplaylist.model'

export enum ActionTypes {

  LOAD_PLAYLIST = '@playlist/load',
  LOAD_PLAYLIST_SUCCESS = '@playlist/load_success',
  LOAD_PLAYLIST_FAIL = '@playlist/load_fail',

  LOAD_MENU = '@playlist_menu/load',
  LOAD_MENU_SUCCESS = '@playlist_menu/load_success',
  LOAD_MENU_FAIL = '@playlist_menu/load_fail',
}

export class LoadPlaylistMenu implements Action {
  readonly type = ActionTypes.LOAD_MENU
}

export class LoadPlaylistMenuSuccess implements Action {
  readonly type = ActionTypes.LOAD_MENU_SUCCESS
  constructor(public payload: MenuPlaylistModel) { }
}

export class LoadPlaylistMenuFail implements Action {
  readonly type = ActionTypes.LOAD_MENU_FAIL
  constructor(public payload: any) { }
}

export class LoadPlaylist implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST;
}

export class LoadPlaylistSuccess implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST_SUCCESS;
  constructor(public payload: Playlist[]) { }
}

export class LoadPlaylistFail implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST_FAIL;
  constructor(public payload: any) { }
}


export type ActionsPlaylist =
| LoadPlaylist
| LoadPlaylistSuccess
| LoadPlaylistFail
| LoadPlaylistMenu
| LoadPlaylistMenuSuccess
| LoadPlaylistMenuFail

