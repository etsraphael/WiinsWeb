import { Action } from '@ngrx/store';
import { TubeModel, TubePublicationModel } from 'src/app/core/models/tube/tube.model';

export enum ActionTypes {

  ADD_TUBE_FEED = '@tube_feed/add',
  ADD_TUBE_FEED_FAIL = '@tube_feed/add__fail',
  ADD_TUBE_FEED_SUCCESS = '@tube_feed/add_success',

  LOAD_TUBE_FEED = '@tube_feed/load',
  LOAD_TUBE_FEED_FAIL = '@tube_feed/load__fail',
  LOAD_TUBE_FEED_SUCCESS = '@tube_feed/load_success',

  DELETE_TUBE_FEED = '@tube_feed/delete',
  DELETE_TUBE_FEED_FAIL = '@tube_feed/delete_fail',
  DELETE_TUBE_FEED_SUCCESS = '@tube_feed/delete_success',

  RESET_TUBE_FEED = '@tube_feed/reset'

}

export class AddTubeFeed implements Action {
  readonly type = ActionTypes.ADD_TUBE_FEED
  constructor(public payload: TubePublicationModel) { }
}

export class AddTubeFeedFail implements Action {
  readonly type = ActionTypes.ADD_TUBE_FEED_FAIL
  constructor(public payload: string) { }
}

export class AddTubeFeedSuccess implements Action {
  readonly type = ActionTypes.ADD_TUBE_FEED_SUCCESS
  constructor(public payload: TubeModel) { }
}

export class DeleteTubeFeed implements Action {
  readonly type = ActionTypes.DELETE_TUBE_FEED
  constructor(public id: string) { }
}

export class DeleteTubeFeedFail implements Action {
  readonly type = ActionTypes.DELETE_TUBE_FEED_FAIL
  constructor(public payload: string) { }
}

export class DeleteTubeFeedSuccess implements Action {
  readonly type = ActionTypes.DELETE_TUBE_FEED_SUCCESS
  constructor(public id: string) { }
}

export class LoadTubeFeed implements Action {
  readonly type = ActionTypes.LOAD_TUBE_FEED
  constructor(public page: number, public profile: string) { }
}

export class LoadTubeFeedFail implements Action {
  readonly type = ActionTypes.LOAD_TUBE_FEED_FAIL
  constructor(public payload: string) { }
}

export class LoadTubeFeedSuccess implements Action {
  readonly type = ActionTypes.LOAD_TUBE_FEED_SUCCESS
  constructor(public payload: TubeModel[]) { }
}

export class ResetTubeFeed implements Action {
  readonly type = ActionTypes.RESET_TUBE_FEED
}

export type TubeFeedActions =
  | LoadTubeFeed
  | LoadTubeFeedFail
  | LoadTubeFeedSuccess
  | DeleteTubeFeed
  | DeleteTubeFeedFail
  | DeleteTubeFeedSuccess
  | ResetTubeFeed
  | AddTubeFeed
  | AddTubeFeedFail
  | AddTubeFeedSuccess