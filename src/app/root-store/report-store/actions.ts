import { Action } from '@ngrx/store';
import { ReportModel } from 'src/app/core/models/report/report.model';

export enum ActionTypes {

  REPORT = '@report/load',
  REPORT_SUCCESS = '@report/load_success',
  REPORT_FAIL = '@report/load_fail',

}

export class Report implements Action {
  readonly type = ActionTypes.REPORT;
  constructor(public payload: ReportModel) {}
}

export class ReportSuccess implements Action {
  readonly type = ActionTypes.REPORT_SUCCESS;
  constructor(public message: string) {}
}

export class ReportFail implements Action {
  readonly type = ActionTypes.REPORT_FAIL;
  constructor(public payload: any) {}
}


export type ActionsReport =
| Report
| ReportSuccess
| ReportFail
