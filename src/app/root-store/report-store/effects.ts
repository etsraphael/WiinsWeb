import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featureActions from './actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import { ActionsReport } from './actions';
import { ReportService } from 'src/app/core/services/report/report.service';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ReportEffects {
  constructor(
    private actions$: Actions,
    private dataService: ReportService,
    private translate: TranslateService,
    private _snackBar: MatSnackBar
  ) { }

  sendReport$: Observable<ActionsReport> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.Report>(featureActions.ActionTypes.REPORT),
    switchMap(action => this.dataService.sendReport(action.payload).pipe(
      tap((response) => this.showSnackBar(response.message)),
      map(data => new featureActions.ReportSuccess(data.message)),
      catchError(error => observableOf(new featureActions.ReportFail(error)))
    ))
  ))

  showSnackBar(message: string): MatSnackBarRef<SimpleSnackBar> {
    return this._snackBar.open(
      this.translate.instant('REPORT.Report-Reponsed.' + message), null,
      { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
    )
  }

}
