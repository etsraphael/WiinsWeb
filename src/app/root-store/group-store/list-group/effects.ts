import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import * as featureActions from './actions'
import { catchError, map, switchMap, tap } from 'rxjs/operators'
import { Observable, of as observableOf } from 'rxjs'
import { ActionsGroup } from './actions'
import { Router } from '@angular/router'
import { GroupService } from 'src/app/core/services/group/group.service'

@Injectable()
export class GroupEffects {
  constructor(
    private dataService: GroupService,
    private router: Router,
    private actions$: Actions
  ) { }

  @Effect()
  creatGroup: Observable<ActionsGroup> = this.actions$.pipe(
    ofType<featureActions.CreatGroup>(featureActions.ActionTypes.CREAT_GROUP),
    switchMap(action => this.dataService.CreatGroup(action.payload).pipe(
      tap(() => this.router.navigate([`/SpaceGroup`])),
      map(items => new featureActions.CreatGroupSuccess(items.group)),
      catchError(error => observableOf(new featureActions.CreatGroupFail(error)))
    ))
  )

  @Effect()
  loadMyGroups: Observable<ActionsGroup> = this.actions$.pipe(
    ofType<featureActions.LoadMyGroups>(featureActions.ActionTypes.LOAD_MY_GROUPS),
    switchMap(() => this.dataService.GetMyGroups().pipe(
      map(items => new featureActions.LoadMyGroupsSuccess(items.groups)),
      catchError(error => observableOf(new featureActions.LoadMyGroupsFail(error)))
    ))
  )

  @Effect()
  leaveGroups: Observable<ActionsGroup> = this.actions$.pipe(
    ofType<featureActions.LeaveGroup>(featureActions.ActionTypes.LEAVE_GROUP),
    switchMap(action => this.dataService.leaveMyGroup(action.id).pipe(
      map(items => new featureActions.LeaveGroupSuccess(items.id)),
      catchError(error => observableOf(new featureActions.LeaveGroupFail(error)))
    ))
  )

}
