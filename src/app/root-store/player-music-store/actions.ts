import { Action } from '@ngrx/store';
import { Music } from 'src/app/core/models/publication/music/music.model';
import { ElementRef } from '@angular/core';

export enum ActionTypes {

  PLAY = '@music/play',
  PLAY_FROM_LINK = '@music/play_from_link',
  PLAY_SUCCESS = '@music/play_success',
  PLAY_FAIL = '@music/play_fail',

  CONTINUE = '@music/continue',

  PAUSE = '@music/pause',
  PAUSE_SUCCESS = '@music/pause_success',
  PAUSE_FAIL = '@music/pause_fail',

  NEXT = '@music/next',
  NEXT_SUCCESS = '@music/next_success',
  NEXT_FAIL = '@music/next_fail',

  PREVIOUS = '@music/previous',
  PREVIOUS_SUCCESS = '@music/previous_success',
  PREVIOUS_FAIL = '@music/previous_fail',

  COMMAND = '@music/command',

  UPDATE_MUSIC_LIKE = '@updateLikeInPlayer/music',
  UPDATE_MUSIC_DISLIKE = '@updateDisLikeInPlayer/music',

  RESET = '@music/controls_reset',
}

export class Reset implements Action {
  readonly type = ActionTypes.RESET
}

export class Command implements Action {
  readonly type = ActionTypes.COMMAND
  constructor(public command: string) {}
}

export class Continue implements Action {
  readonly type = ActionTypes.CONTINUE
}

export class PlayFromLink implements Action {
  readonly type = ActionTypes.PLAY_FROM_LINK;
  constructor(public musicPlaying: Music, public musicList: Music[]) {}
}

export class Play implements Action {
  readonly type = ActionTypes.PLAY;
  constructor(public audioRef: ElementRef, public musicPlaying: Music, public musicList: Music[]) {}
}

export class PlaySuccess implements Action {
  readonly type = ActionTypes.PLAY_SUCCESS;
  constructor( public musicPlaying: Music, public musicList: Music[]) {}
}

export class PlayFail implements Action {
  readonly type = ActionTypes.PLAY_FAIL;
  constructor(public payload: any) {}
}

export class Pause implements Action {
  readonly type = ActionTypes.PAUSE;
}

export class PauseSuccess implements Action {
  readonly type = ActionTypes.PAUSE_SUCCESS;
}

export class PauseFail implements Action {
  readonly type = ActionTypes.PAUSE_FAIL;
  constructor(public payload: any) {}
}

export class Next implements Action {
  readonly type = ActionTypes.NEXT;
  constructor(public musicPlaying: Music) {}
}

export class NextSuccess implements Action {
  readonly type = ActionTypes.NEXT_SUCCESS;
  constructor(public musicPlaying: Music) {}
}

export class NextFail implements Action {
  readonly type = ActionTypes.NEXT_FAIL;
  constructor(public payload: any) {}
}

export class Previous implements Action {
  readonly type = ActionTypes.PREVIOUS;
  constructor(public musicPlaying: Music) {}
}

export class PreviousSuccess implements Action {
  readonly type = ActionTypes.PREVIOUS_SUCCESS;
  constructor(public musicPlaying: Music) {}
}

export class PreviousFail implements Action {
  readonly type = ActionTypes.PREVIOUS_FAIL;
  constructor(public payload: any) {}
}

export class UpdateMusicLike implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_LIKE
  constructor(public musicID: string) { }
}

export class UpdateMusicDisLike implements Action {
  readonly type = ActionTypes.UPDATE_MUSIC_DISLIKE
  constructor(public musicID: string) { }
}


export type ActionsPlayerMusic =
| PlayFromLink
| Play
| PlaySuccess
| PlayFail
| Pause
| PauseSuccess
| PauseFail
| Next
| NextSuccess
| NextFail
| Previous
| PreviousSuccess
| PreviousFail
| UpdateMusicLike
| UpdateMusicDisLike
| Continue
| Command
| Reset

