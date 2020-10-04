import { Action } from '@ngrx/store';

export enum ActionTypes {

  LOAD_NUMBER_REQUEST = '@load_number_request/load',
  LOAD_NUMBER_REQUEST_SUCCESS = '@load_number_request/load_success',
  LOAD_NUMBER_REQUEST_FAIL = '@load_number_request/load_fail',

  INITIALIZE_NUMBER_REQUEST = '@initialize_number_request/initialize',
  INITIALIZE_NUMBER_REQUEST_SUCCESS = '@initialize_number_request/initialize_success',
  INITIALIZE_NUMBER_REQUEST_FAIL = '@initialize_number_request/initialize_fail',

  LOAD_NUMBER_ACTIVITY = '@load_number_activity/load',
  LOAD_NUMBER_ACTIVITY_SUCCESS = '@load_number_activity/load_success',
  LOAD_NUMBER_ACTIVITY_FAIL = '@@load_number_activity/load_fail',

  INITIALIZE_NUMBER_ACTIVITY = '@initialize_number_activity/initialize',
  INITIALIZE_NUMBER_ACTIVITY_SUCCESS = '@initialize_number_activity/initialize_success',
  INITIALIZE_NUMBER_ACTIVITY_FAIL = '@initialize_number_activity/initialize_fail',
}

export class LoadNumberRequest implements Action {
  readonly type = ActionTypes.LOAD_NUMBER_REQUEST;
}

export class LoadNumberRequestSuccess implements Action {
  readonly type = ActionTypes.LOAD_NUMBER_REQUEST_SUCCESS;
  constructor(public number: number) {}
}

export class LoadNumberRequestFail implements Action {
  readonly type = ActionTypes.LOAD_NUMBER_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class InitilizeNumberRequest implements Action {
  readonly type = ActionTypes.INITIALIZE_NUMBER_REQUEST;
}

export class InitilizeNumberRequestSuccess implements Action {
  readonly type = ActionTypes.INITIALIZE_NUMBER_REQUEST_SUCCESS;
  constructor(public seen: Boolean) {}
}

export class InitilizeNumberRequestFail implements Action {
  readonly type = ActionTypes.INITIALIZE_NUMBER_REQUEST_FAIL;
  constructor(public payload: any) {}
}

export class LoadNumberActivity implements Action {
  readonly type = ActionTypes.LOAD_NUMBER_ACTIVITY;
}

export class LoadNumberActivitySuccess implements Action {
  readonly type = ActionTypes.LOAD_NUMBER_ACTIVITY_SUCCESS;
  constructor(public number: number) {}
}

export class LoadNumberActivityFail implements Action {
  readonly type = ActionTypes.LOAD_NUMBER_ACTIVITY_FAIL;
  constructor(public payload: any) {}
}

export class InitilizeNumberActivity implements Action {
  readonly type = ActionTypes.INITIALIZE_NUMBER_ACTIVITY;
}

export class InitilizeNumberActivitySuccess implements Action {
  readonly type = ActionTypes.INITIALIZE_NUMBER_ACTIVITY_SUCCESS;
  constructor(public seen: Boolean) {}
}

export class InitilizeNumberActivityFail implements Action {
  readonly type = ActionTypes.INITIALIZE_NUMBER_ACTIVITY_FAIL;
  constructor(public payload: any) {}
}


export type ActionsNumberNotification =
   LoadNumberRequest
|  LoadNumberRequestSuccess
|  LoadNumberRequestFail
|  InitilizeNumberRequest
|  InitilizeNumberRequestSuccess
|  InitilizeNumberRequestFail
|  LoadNumberActivity
|  LoadNumberActivitySuccess
|  LoadNumberActivityFail
|  InitilizeNumberActivity
|  InitilizeNumberActivitySuccess
|  InitilizeNumberActivityFail;
