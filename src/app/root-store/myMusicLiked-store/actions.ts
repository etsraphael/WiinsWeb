import { Action } from '@ngrx/store';
import { Music } from 'src/app/core/models/publication/music/music.model';

export enum ActionTypes {

  LOAD_MY_MUSIC = '@my_music/load',
  LOAD_MY_MUSIC_SUCCESS = '@my_music/load_success',
  LOAD_MY_MUSIC_FAIL = '@my_music/load_fail',

  LIKE_MUSIC = '@like/music',
  LIKE_MUSIC_SUCCESS = '@like/music_success',
  LIKE_MUSIC_FAIL = '@like/music_fail',

  DISLIKE_MUSIC = '@dislike/music',
  DISLIKE_MUSIC_SUCCESS = '@dislike/music_success',
  DISLIKE_MUSIC_FAIL = '@dislike/music_fail',

}

export class LoadMyMusic implements Action {
  readonly type = ActionTypes.LOAD_MY_MUSIC;
}

export class LoadMyMusicSuccess implements Action {
  readonly type = ActionTypes.LOAD_MY_MUSIC_SUCCESS;
  constructor(public payload: Music[]) { }
}

export class LoadMyMusicFail implements Action {
  readonly type = ActionTypes.LOAD_MY_MUSIC_FAIL;
  constructor(public payload: any) { }
}

export class LikeMusic implements Action {
  readonly type = ActionTypes.LIKE_MUSIC
  constructor(public music: Music) { }
}


export class LikeMusicSuccess implements Action {
  readonly type = ActionTypes.LIKE_MUSIC_SUCCESS
  constructor(public response: string) { }
}

export class LikeMusicFail implements Action {
  readonly type = ActionTypes.LIKE_MUSIC_FAIL
  constructor(public payload: any) { }
}

export class DisLikeMusic implements Action {
  readonly type = ActionTypes.DISLIKE_MUSIC
  constructor(public music: Music) { }
}

export class DisLikeMusicSuccess implements Action {
  readonly type = ActionTypes.DISLIKE_MUSIC_SUCCESS
  constructor(public response: string) { }
}

export class DisLikeMusicFail implements Action {
  readonly type = ActionTypes.DISLIKE_MUSIC_FAIL
  constructor(public payload: any) { }
}


export type ActionsMyMusic =
| LoadMyMusic
| LoadMyMusicSuccess
| LoadMyMusicFail
| LikeMusic
| LikeMusicSuccess
| LikeMusicFail
| DisLikeMusic
| DisLikeMusicSuccess
| DisLikeMusicFail

