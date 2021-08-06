import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as featureActions from './actions';
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import { PageService } from 'src/app/core/services/page/page.service';
import { ActionsPage } from './actions';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProfileFeatureStoreActions } from '../profile-feature-store'
import { Action } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class PageFeatureEffects {
  constructor(
    private dataService: PageService,
    private router: Router,
    private actions$: Actions,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  loadPage$: Observable<ActionsPage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.LoadPage>(featureActions.ActionTypes.LOAD_PAGE),
    switchMap(action => this.dataService.GetPage(action.name).pipe(
      map(items => new featureActions.LoadPageSuccess(items.page)),
      catchError(error => observableOf(new featureActions.LoadPageFail(error)))
    ))
  ));

  creatPage$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.CreatPage>(featureActions.ActionTypes.CREAT_PAGE),
    switchMap(action => this.dataService.CreatPage(action.page).pipe(
      tap(items => this.router.navigate([`/mypage/${items.page._id}`])),
      mergeMap(items =>[
        new featureActions.CreatPageSuccess(items.page),
        new ProfileFeatureStoreActions.addPageProfile(items.page)
      ]),
      catchError(error => observableOf(new featureActions.CreatPageFail(error)))
    ))
  ))

  deletePage$: Observable<ActionsPage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.DeletePage>(featureActions.ActionTypes.DELETE_PAGE),
    switchMap(action => this.dataService.DeletePage(action.pageId, action.password).pipe(
      tap(() => {
        this.router.navigate([`/SpaceStory`]),
        this._snackBar.open(
          this.translate.instant('VALID-MESSAGE.update-is-done'),
          this.translate.instant('CORE.close'),
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
        )
      }),
      map(items => new featureActions.DeletePageSuccess(items.message)),
      catchError(error => observableOf(new featureActions.DeletePageFail(error)))
    ))
  ));

  changeVisibility$: Observable<ActionsPage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.ChangeVisibility>(featureActions.ActionTypes.CHANGE_VISIBILITY),
    switchMap(event => this.getAction(event)),
    catchError(error => observableOf(new featureActions.ChangeVisibilityFail(error)))
  ));

  getAction(event) {
    switch (event.categorie) {
      case 'noVisible':
        return this.dataService.DisablePage(event.pageId, event.password).pipe(
          map(items => new featureActions.ChangeVisibilitySuccess(items.page, items.message)));
      case 'Visible':
        return this.dataService.EnablePage(event.pageId, event.password).pipe(
          map(items => new featureActions.ChangeVisibilitySuccess(items.page, items.message)));
      default:
        return null;
    }
  }


  followPage$: Observable<ActionsPage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.FollowPage>(featureActions.ActionTypes.FOLLOW_PAGE),
    switchMap(action => this.dataService.FollowPage(action.id).pipe(
      map(items => new featureActions.FollowPageSuccess(items.status)),
      catchError(error => observableOf(new featureActions.FollowPageFail(error)))
    ))
  ))

  unfollowPage$: Observable<ActionsPage> = createEffect(() => this.actions$.pipe(
    ofType<featureActions.UnFollowPage>(featureActions.ActionTypes.UNFOLLOW_PAGE),
    switchMap(action => this.dataService.UnfollowPage(action.id).pipe(
      map(items => new featureActions.UnFollowPageSuccess(items.status)),
      catchError(error => observableOf(new featureActions.UnFollowPageFail(error)))
    ))
  ))


}
