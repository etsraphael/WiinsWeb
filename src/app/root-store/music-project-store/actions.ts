import { MusicProject } from 'src/app/core/models/publication/music/musicProject.model';
import { Action } from '@ngrx/store';
import { Music } from 'src/app/core/models/publication/music/music.model';

export enum ActionTypes {
  
  ADD_MUSIC_PROJECT = '@music_project/add',
  ADD_MUSIC_PROJECT_SUCCESS = '@music_project/add_success',
  ADD_MUSIC_PROJECT_FAIL = '@music_project/add_fail',

  LOAD_MUSIC_PROJECT_BY_PROFILE = '@music_project_profile/load',
  LOAD_MUSIC_PROJECT_BY_MY_PROFILE = '@music_project_my_profile/load',
  LOAD_MUSIC_PROJECT_BY_PROFILE_SUCCESS = '@music_project_profile/load_success',
  LOAD_MUSIC_PROJECT_BY_PROFILE_FAIL = '@music_project_profile/load_fail',

  UPDATE_MUSIC = '@music_project/update',
  UPDATE_MUSIC_SUCCESS = '@music_project/update_success',
  UPDATE_MUSIC_FAIL = '@music_project/update_fail',

  DELETE_MUSIC = '@music/delete',
  DELETE_MUSIC_SUCCESS = '@music/delete_success',
  DELETE_MUSIC_FAIL = '@music/delete_fail',

  DELETE_PLAYLIST = '@playlist/delete',
  DELETE_PLAYLIST_SUCCESS = '@playlist/delete_success',
  DELETE_PLAYLIST_FAIL = '@playlist/delete_fail',

  DELETE_MUSIC_PROJECT = '@music_project/delete',
  DELETE_MUSIC_PROJECT_SUCCESS = '@music_project/delete_success',
  DELETE_MUSIC_PROJECT_FAIL = '@music_project/delete_fail',

  UPDATE_MUSIC_PROJECT = '@playlist_music/update',
  UPDATE_MUSIC_PROJECT_SUCCESS = '@playlist_music/update_success',
  UPDATE_MUSIC_PROJECT_FAIL = '@playlist_music/update_fail',

  UPDATE_MUSIC_LIKE = '@updateLikeInProfile/music',
  UPDATE_MUSIC_DISLIKE = '@updateDisLikeInProfile/music',

  WRONG_PASSWORD = '@music_not_delete/wrong_password',
}

export class deleteMusicProject implements Action {
  readonly type = ActionTypes.DELETE_MUSIC_PROJECT
  constructor(public id: string, public password: string) { }
}

export class deleteMusicProjectSuccess implements Action {
  readonly type = ActionTypes.DELETE_MUSIC_PROJECT_SUCCESS
  constructor(public id: string) { }
}

export class deleteMusicProjectFail implements Action {
  readonly type = ActionTypes.DELETE_MUSIC_PROJECT_FAIL
  constructor(public payload: any) { }
}


export class WrongPassword implements Action {
  readonly type = ActionTypes.WRONG_PASSWORD
  constructor(public message: string) { }
}

export class AddMusicProject implements Action {
  readonly type = ActionTypes.ADD_MUSIC_PROJECT;
  constructor(public payload: MusicProject) { }
}

export class AddMusicProjectSuccess implements Action {
  readonly type = ActionTypes.ADD_MUSIC_PROJECT_SUCCESS;
  constructor(public payload: MusicProject) { }
}

export class AddMusicProjectFail implements Action {
  readonly type = ActionTypes.ADD_MUSIC_PROJECT_FAIL;
  constructor(public payload: any) { }
}

export class LoadMusicProjectByProfile implements Action {
  readonly type = ActionTypes.LOAD_MUSIC_PROJECT_BY_PROFILE;
  constructor(public id: string) { }
}

export class LoadMusicProjectByMyProfile implements Action {
  readonly type = ActionTypes.LOAD_MUSIC_PROJECT_BY_MY_PROFILE;
}

export class LoadMusicProjectByProfileSuccess implements Action {
  readonly type = ActionTypes.LOAD_MUSIC_PROJECT_BY_PROFILE_SUCCESS;
  constructor(public payload: MusicProject[]) { }
}

export class LoadMusicProjectByProfileFail implements Action {
  readonly type = ActionTypes.LOAD_MUSIC_PROJECT_BY_PROFILE_FAIL;
  constructor(public payload: any) { }
}

export class UpdateMusic implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC
  constructor(public payload: Music, public categorie: string) { }
}

export class UpdateMusicSuccess implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_SUCCESS
  constructor(public payload: MusicProject) { }
}

export class UpdateMusicFail implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_FAIL
  constructor(public payload: any) { }
}

export class UpdateMusicProject implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_PROJECT
  constructor(public payload: MusicProject, public password?: string) { }
}

export class UpdateMusicProjectSuccess implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_PROJECT_SUCCESS
  constructor(public payload: MusicProject) { }
}

export class UpdateMusicProjectFail implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_PROJECT_FAIL
  constructor(public payload: any) { }
}

export class DeleteMusic implements Action {
  readonly type = ActionTypes.DELETE_MUSIC
  constructor(public publicationID: string, public musicID: string, public password: string) { }
}

export class DeleteMusicSuccess implements Action {
  readonly type = ActionTypes.DELETE_MUSIC_SUCCESS
  constructor(public payload: MusicProject) { }
}

export class DeleteMusicFail implements Action {
  readonly type = ActionTypes.DELETE_MUSIC_FAIL
  constructor(public message: string) { }
}

export class DeletePlaylist implements Action {
  readonly type = ActionTypes.DELETE_PLAYLIST
  constructor(public id: string, public password: string) { }
}

export class DeletePlaylistSuccess implements Action {
  readonly type = ActionTypes.DELETE_PLAYLIST_SUCCESS
  constructor(public payload: MusicProject) { }
}

export class DeletePlaylistFail implements Action {
  readonly type = ActionTypes.DELETE_PLAYLIST_FAIL
  constructor(public message: string) { }
}

export class UpdateMusicLike implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_LIKE
  constructor(public payload: Music, public musicProjectId: string) { }
}

export class UpdateMusicDisLike implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_DISLIKE
  constructor(public payload: Music, public musicProjectId: string) { }
}


export type ActionsMusicProject =
  | AddMusicProject
  | AddMusicProjectSuccess
  | AddMusicProjectFail
  | LoadMusicProjectByProfile
  | LoadMusicProjectByMyProfile
  | LoadMusicProjectByProfileSuccess
  | LoadMusicProjectByProfileFail
  | UpdateMusic
  | UpdateMusicSuccess
  | UpdateMusicFail
  | UpdateMusicProject
  | UpdateMusicProjectSuccess
  | UpdateMusicProjectFail
  | DeleteMusic
  | DeleteMusicSuccess
  | DeleteMusicFail
  | DeletePlaylist
  | DeletePlaylistSuccess
  | DeletePlaylistFail
  | UpdateMusicLike
  | UpdateMusicDisLike
  | WrongPassword
  | deleteMusicProject
  | deleteMusicProjectSuccess
  | deleteMusicProjectFail

