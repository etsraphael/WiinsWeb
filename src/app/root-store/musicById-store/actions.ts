import { Action } from '@ngrx/store';
import { Music } from 'src/app/core/models/publication/music/music.model';

export enum ActionTypes {

  LOAD_MUSIC_BY_ID = '@music_by_id/load',
  LOAD_MUSIC_BY_ID_START = '@music_by_id/load_start',
  LOAD_MUSIC_BY_ID_SUCCESS = '@music_by_id/load_success',
  LOAD_MUSIC_BY_ID_FAIL = '@music_by_id/load_fail',
}

export class LoadMusicById implements Action {
  readonly type = ActionTypes.LOAD_MUSIC_BY_ID;
  constructor(public id: string) { }
}

export class LoadMusicByIdStart implements Action {
  readonly type = ActionTypes.LOAD_MUSIC_BY_ID_START;
}

export class LoadMusicByIdSuccess implements Action {
  readonly type = ActionTypes.LOAD_MUSIC_BY_ID_SUCCESS;
  constructor(public payload: Music) { }
}

export class LoadMusicByIdFail implements Action {
  readonly type = ActionTypes.LOAD_MUSIC_BY_ID_FAIL;
  constructor(public payload: any) { }
}

export type ActionsMusicById =
  | LoadMusicById
  | LoadMusicByIdStart
  | LoadMusicByIdSuccess
  | LoadMusicByIdFail;

