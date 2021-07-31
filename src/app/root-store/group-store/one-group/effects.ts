import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import * as featureActions from './actions'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { ActionsGroup } from './actions'
import { GroupService } from 'src/app/core/services/group/group.service'
import { CoreService } from 'src/app/core/services/core/core.service'
import { TeamUpdate } from 'src/app/core/models/confirmation/teamUpdate'
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'

@Injectable()
export class GroupEffects {
  constructor(
    private dataService: GroupService, private actions$: Actions,
    private _snackBar: MatSnackBar, private profileService: CoreService,
    private dialogRef: MatDialog, private router: Router, private translate: TranslateService
  ) { }

  loadGroupAdmin$: Observable<ActionsGroup> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadGroupAdmin>(featureActions.ActionTypes.LOAD_GROUP),
    switchMap(action => this.dataService.GetGroupForAdmin(action.id).pipe(
      map(items => new featureActions.LoadGroupAdminSuccess(items.group)),
      catchError(error => observableOf(new featureActions.LoadGroupAdminFail(error)))
    ))
  ))

  updateGroup$: Observable<ActionsGroup> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.UpdateGroup>(featureActions.ActionTypes.UPDATE_GROUP),
    switchMap(action => this.dataService.UpdateGroup(action.payload).pipe(
      tap(() => this._snackBar.open(
        this.translate.instant('VALID-MESSAGE.update-is-done'), 
        this.translate.instant('CORE.close'), {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      })),
      map(items => new featureActions.UpdateGroupSuccess(items.group)),
      catchError(error => observableOf(new featureActions.UpdateGroupFail(error)))
    ))
  ))

  loadMember$: Observable<ActionsGroup> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadMember>(featureActions.ActionTypes.LOAD_MEMBER),
    switchMap(action => this.profileService.GetGroupMembers(action.id, action.page, action.total).pipe(
      map( items => new featureActions.LoadMemberSuccess(items.results)),
      catchError(error => observableOf(new featureActions.LoadMemberFail(error)))
    ))
  ))

  addRequestMember$: Observable<ActionsGroup> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.SendRequestMember>(featureActions.ActionTypes.SEND_REQUEST_MEMBER),
    switchMap(action => this.dataService.AddRequestGroup(action.teamID, action.profileID).pipe(
      map( items => new featureActions.SendRequestMemberSuccess(items.profile)),
      catchError(error => observableOf(new featureActions.SendRequestMemberFail(error)))
    ))
  ))

  deleteMember$: Observable<ActionsGroup> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.deleteMember>(featureActions.ActionTypes.DELETE_MEMBER),
    switchMap(action => this.dataService.DeleteMemberGroup(action.groupID, action.profileID).pipe(
      map( items => new featureActions.deleteMemberSuccess(items.profile)),
      catchError(error => observableOf(new featureActions.deleteMemberFail(error)))
    ))
  ))

  udpateTeam$: Observable<ActionsGroup> = createEffect(() => this.actions$.pipe(
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
        return this.dataService.DeleteAdmin(update.teamId, update.profileId, password).pipe(
          tap(() => { this.successUpdate(), this.dialogRef.closeAll() }),
          map(data => new featureActions.ChangeRoleSuccess(data.result)),
          catchError(error => observableOf(new featureActions.ChangeRoleFail(error)))
        )
      case 'replacePr':
        return this.dataService.ReplacePr(update.teamId, update.profileId, password).pipe(
          tap(() => { this.successUpdate(), this.dialogRef.closeAll() }),
          map(data => new featureActions.ChangeRoleSuccess(data.result)),
          catchError(error => observableOf(new featureActions.ChangeRoleFail(error)))
        )
      case 'add':
        return this.dataService.AddMember(update.teamId, update.profileId).pipe(
          tap(() => this.successUpdate()),
          map(data => new featureActions.AddAdminSuccess(data.profile)),
          catchError(error => observableOf(new featureActions.ChangeRoleFail(error)))
        )
      case 'leave':
        return this.dataService.leaveGroup(update.teamId, update.profileId, password).pipe(
          tap(data => {
            this.dialogRef.closeAll();
            this.successUpdate();
            this.router.navigate([`/SpaceGroup/group-story`]);
            window.location.reload()
          }),
          map(() => new featureActions.leaveGroupSuccess()),
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
