import { Playlist } from '../../core/models/music/playlist.model';
import { Action } from '@ngrx/store';
import { Music } from 'src/app/core/models/publication/music/music.model';

export enum ActionTypes {

  LOAD_PLAYLIST_BY_ID = '@playlist_by_id/load',
  LOAD_PLAYLIST_BY_ID_START = '@playlist_by_id/load_start',
  LOAD_PLAYLIST_BY_ID_SUCCESS = '@playlist_by_id/load_success',
  LOAD_PLAYLIST_BY_ID_FAIL = '@playlist_by_id/load_fail',

  CREATE_PLAYLIST = '@playlist/create',
  CREATE_PLAYLIST_START = '@playlist/create_start',
  CREATE_PLAYLIST_SUCCESS = '@playlist/create_success',
  CREATE_PLAYLIST_FAIL = '@playlist/create_fail',

  UPDATE_MUSIC_LIKE = '@updateLikeInPlaylist/music',
  UPDATE_MUSIC_DISLIKE = '@updateDisLikeInPlaylist/music',
}

export class LoadPlaylistById implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST_BY_ID;
  constructor(public id: string) { }
}

export class LoadPlaylistByIdStart implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST_BY_ID_START;
}

export class LoadPlaylistByIdSuccess implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST_BY_ID_SUCCESS;
  constructor(public payload: Playlist) { }
}

export class LoadPlaylistByIdFail implements Action {
  readonly type = ActionTypes.LOAD_PLAYLIST_BY_ID_FAIL;
  constructor(public payload: any) { }
}


export class CreatePlaylist implements Action {
  readonly type = ActionTypes.CREATE_PLAYLIST;
  constructor(public payload: Playlist) { }
}

export class CreatePlaylistStart implements Action {
  readonly type = ActionTypes.CREATE_PLAYLIST_START;
}

export class CreatePlaylistSuccess implements Action {
  readonly type = ActionTypes.CREATE_PLAYLIST_SUCCESS;
  constructor(public payload: Playlist) { }
}

export class CreatePlaylistFail implements Action {
  readonly type = ActionTypes.CREATE_PLAYLIST_FAIL;
  constructor(public payload: any) { }
}

export class UpdateMusicLike implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_LIKE
  constructor(public payload: Music) { }
}

export class UpdateMusicDisLike implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_DISLIKE
  constructor(public payload: Music) { }
}

export type ActionsPlaylistById =
| LoadPlaylistById
| LoadPlaylistByIdStart
| LoadPlaylistByIdSuccess
| LoadPlaylistByIdFail
| CreatePlaylist
| CreatePlaylistStart
| CreatePlaylistSuccess
| CreatePlaylistFail
| UpdateMusicLike
| UpdateMusicDisLike

