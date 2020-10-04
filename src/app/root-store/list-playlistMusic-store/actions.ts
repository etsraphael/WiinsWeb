import { Playlist } from './../../core/models/music/playlist.model'
import { Action } from '@ngrx/store'

export enum ActionTypes {
  LOAD_PLAYLISTS = '@playlists/load',
  LOAD_PLAYLISTS_SUCCESS = '@playlists/load_success',
  LOAD_PLAYLISTS_FAIL = '@playlists/load_fail',

  RESET_PLAYLISTS = '@playlists/reset',
}

export class resetListPlaylist implements Action {
  readonly type = ActionTypes.RESET_PLAYLISTS
}

export class LoadPlaylists implements Action {
  readonly type = ActionTypes.LOAD_PLAYLISTS
  constructor(public name: string, public page: number) { }
}

export class LoadPlaylistsSuccess implements Action {
  readonly type = ActionTypes.LOAD_PLAYLISTS_SUCCESS
  constructor(public payload: Playlist[]) { }
}

export class LoadPlaylistsFail implements Action {
  readonly type = ActionTypes.LOAD_PLAYLISTS_FAIL
  constructor(public payload: any) { }
}


export type ActionsPlaylist =
  | LoadPlaylists
  | LoadPlaylistsSuccess
  | LoadPlaylistsFail
  | resetListPlaylist
