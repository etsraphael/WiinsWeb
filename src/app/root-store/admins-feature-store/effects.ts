import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as featureActions from './actions'
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { PageService } from 'src/app/core/services/page/page.service'
import { ActionsPage } from './actions'
import { TeamUpdate } from 'src/app/core/models/confirmation/teamUpdate'
import { Action } from '@ngrx/store'
import { Router } from '@angular/router'
import { ProfileFeatureStoreActions } from '../profile-feature-store'
import { TranslateService } from '@ngx-translate/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'

@Injectable()
export class AdminsFeatureEffects {
  constructor(
    private dataService: PageService,
    private actions$: Actions,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialog,
    private router: Router,
    private translate: TranslateService
  ) { }

  loadAdmins$: Observable<ActionsPage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadAdmins>(featureActions.ActionTypes.LOAD_ADMINS),
    switchMap(action => this.dataService.GetAdmins(action.pageId).pipe(
      map(items => new featureActions.LoadAdminsSuccess(items.result)),
      catchError(error => observableOf(new featureActions.LoadAdminsFail(error)))
    ))
  ))

  udpateTeam$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.ChangeRole>(featureActions.ActionTypes.CHANGE_ROLE),
    switchMap(action => this.catagorieOfChange(action.update, action.password)),
  ))

  catagorieOfChange(update: TeamUpdate, password: string) {
    switch (update.catagorie) {
      case 'promote':
        return this.dataService.PromoteUser(update.teamId, update.profileId, password).pipe(
          tap(() => { this.successUpdate(), this.dialogRef.closeAll() }),
          map(data => new featureActions.ChangeRoleSuccess(data.result)),
          catchError(error => observableOf(new featureActions.ChangeRoleFail(error)))
        )
      case 'demote':
        return this.dataService.DemoteUser(update.teamId, update.profileId, password).pipe(
          tap(() => { this.successUpdate(), this.dialogRef.closeAll() }),
          map(data => new featureActions.ChangeRoleSuccess(data.result)),
          catchError(error => observableOf(new featureActions.ChangeRoleFail(error)))
        )
      case 'delete':
        return this.dataService.DeleteUser(update.teamId, update.profileId, password).pipe(
          tap(() => { this.successUpdate(), this.dialogRef.closeAll() }),
          map(data => new featureActions.ChangeRoleSuccess(data.result)),
          catchError(error => observableOf(new featureActions.ChangeRoleFail(error)))
        )
      case 'replacePr':
        return this.dataService.ReplacePr(update.teamId, update.profileId, password).pipe(
          tap(() => { window.location.reload(); this.successUpdate() }),
          map(data => new featureActions.ChangeRoleSuccess(data.result)),
          catchError(error => observableOf(new featureActions.ChangeRoleFail(error)))
        )
      case 'add':
        return this.dataService.AddMember(update.teamId, update.profileId).pipe(
          tap(() => { this.successUpdate(), this.dialogRef.closeAll() }),
          map(data => new featureActions.ChangeRoleSuccess(data.result)),
          catchError(error => observableOf(new featureActions.ChangeRoleFail(error)))
        )
      case 'leave':
        return this.dataService.leaveGroup(update.teamId, update.profileId, password).pipe(
          tap(data => {
            this.dialogRef.closeAll();
            this.successUpdate();
            this.router.navigate([`/page/${data.result.pageId}`])
          }),
          mergeMap(data => [
            new featureActions.ChangeRoleSuccess(data.result),
            new ProfileFeatureStoreActions.updateLeftAdminPage(data.result.pageId)
          ]),
          catchError(error => observableOf(new featureActions.ChangeRoleFail(error)))
        )
    }
  }

  successUpdate() {
    return this._snackBar.open(
      this.translate.instant('VALID-MESSAGE.update-is-done'),
      this.translate.instant('CORE.close'), {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    });
  }


}
