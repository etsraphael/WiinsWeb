import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PageFeatureStoreActions, AdminsFeatureStoreActions, AdminsFeatureStoreSelectors } from 'src/app/root-store';
import { AdminModel, AdminPage } from '../../models/page/admin.model';
import { skipWhile, filter, tap, map, switchMap, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PageResolver implements Resolve<string>  {

  // user
  myProfileId: string;

  // admins
  admins$: Observable<AdminPage>;
  admins: AdminModel;
  adminSubscription: Subscription;

  // role
  moderatorsFound: string;
  managersFound: string;
  myrole: string;

  constructor(private store$: Store<RootStoreState.State>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<string> {

    this.myProfileId = route.parent.data.loadedUser.profile
    this.store$.dispatch(new PageFeatureStoreActions.LoadPage(route.params['id']))
    this.store$.dispatch(new AdminsFeatureStoreActions.LoadAdmins(route.params['id']));

    // to select the admin
    this.admins$ = this.store$.pipe(
      select(AdminsFeatureStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    );

    // to get the role
    return this.admins$.pipe(
      tap(adminModel => this.checkRole(adminModel)),
      switchMap(() => of(this.myrole)),
      take(1)
    )

  }

  checkRole(admins: any): void {
    this.filterMaOrMo(admins);

    switch (this.myProfileId) {
      case admins.president._id: {
        this.myrole = 'pr'
        break
      }
      case this.managersFound:{
        this.myrole = 'ma'
        break
      }
      case this.moderatorsFound: {
        this.myrole = 'mo'
        break
      }
      default: break;
    }

  }

  filterMaOrMo(admins: any) {

    if ( !(admins.moderators.map(function (x) { return x._id; }).indexOf(this.myProfileId) === -1) ) {
      this.moderatorsFound = admins.moderators.filter(obj => obj._id === this.myProfileId)[0]._id;
    }

    if ( !(admins.managers.map(function (x) { return x._id; }).indexOf(this.myProfileId) === -1) ) {
      this.managersFound = admins.managers.filter(obj => obj._id === this.myProfileId)[0]._id;
    }
  }

}
