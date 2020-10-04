import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as featureActions from './actions';
import { catchError, map, switchMap, tap, mergeMap } from 'rxjs/operators';
import { Observable, of as observableOf } from 'rxjs';
import { PageService } from 'src/app/core/services/page/page.service';
import { ActionsPage } from './actions';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ProfileFeatureStoreActions } from '../profile-feature-store'
import { Action } from '@ngrx/store';

@Injectable()
export class PageFeatureEffects {
  constructor(
    private dataService: PageService,
    private router: Router,
    private actions$: Actions,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  @Effect()
  loadPage: Observable<ActionsPage> = this.actions$.pipe(
    ofType<featureActions.LoadPage>(featureActions.ActionTypes.LOAD_PAGE),
    switchMap(action => this.dataService.GetPage(action.name).pipe(
      map(items => new featureActions.LoadPageSuccess(items.page)),
      catchError(error => observableOf(new featureActions.LoadPageFail(error)))
    ))
  );

  @Effect()
  creatPage: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.CreatPage>(featureActions.ActionTypes.CREAT_PAGE),
    switchMap(action => this.dataService.CreatPage(action.page).pipe(
      tap(items => this.router.navigate([`/mypage/${items.page._id}`])),
      mergeMap(items =>[
        new featureActions.CreatPageSuccess(items.page),
        new ProfileFeatureStoreActions.addPageProfile(items.page)
      ]),
      catchError(error => observableOf(new featureActions.CreatPageFail(error)))
    ))
  )

  @Effect()
  deletePage: Observable<ActionsPage> = this.actions$.pipe(
    ofType<featureActions.DeletePage>(featureActions.ActionTypes.DELETE_PAGE),
    switchMap(action => this.dataService.DeletePage(action.pageId, action.password).pipe(
      tap(() => {
        this.router.navigate([`/SpaceStory`]),
        this._snackBar.open(
          this.translate.instant('VALID-MESSAGE.update-is-done'),
          this.translate.instant('CORE.close'),
          { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 5000 }
        )
      }),
      map(items => new featureActions.DeletePageSuccess(items.message)),
      catchError(error => observableOf(new featureActions.DeletePageFail(error)))
    ))
  );

  @Effect()
  changeVisibility: Observable<ActionsPage> = this.actions$.pipe(
    ofType<featureActions.ChangeVisibility>(featureActions.ActionTypes.CHANGE_VISIBILITY),
    switchMap(event => this.getAction(event)),
    catchError(error => observableOf(new featureActions.ChangeVisibilityFail(error)))
  );

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


  @Effect()
  followPage: Observable<ActionsPage> = this.actions$.pipe(
    ofType<featureActions.FollowPage>(featureActions.ActionTypes.FOLLOW_PAGE),
    switchMap(action => this.dataService.FollowPage(action.id).pipe(
      map(items => new featureActions.FollowPageSuccess(items.status)),
      catchError(error => observableOf(new featureActions.FollowPageFail(error)))
    ))
  )

  @Effect()
  unfollowPage: Observable<ActionsPage> = this.actions$.pipe(
    ofType<featureActions.UnFollowPage>(featureActions.ActionTypes.UNFOLLOW_PAGE),
    switchMap(action => this.dataService.UnfollowPage(action.id).pipe(
      map(items => new featureActions.UnFollowPageSuccess(items.status)),
      catchError(error => observableOf(new featureActions.UnFollowPageFail(error)))
    ))
  )


}
