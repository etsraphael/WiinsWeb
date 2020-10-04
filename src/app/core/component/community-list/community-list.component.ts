import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootStoreState, ProfileListStoreActions, ProfileListStoreSelectors } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { ProfileModel } from '../../models/baseUser/profile.model';
import { PageModel } from '../../models/page/page.model';
import { filter, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})

export class CommunityListComponent implements OnInit {

  // type
  typeOfCommunity: string = 'friends'

  // profiles or pages
  profiles$: Observable<ProfileModel[]|PageModel[]>
  error$: Observable<any>
  loading$: Observable<boolean>

  constructor(
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit() {

    // get list of my friends
    this.store$.dispatch(new ProfileListStoreActions.GetProfileList(this.typeOfCommunity, 1))

    // to select list of profiles
    this.profiles$ = this.store$.pipe(
      select(ProfileListStoreSelectors.selectAllItems),
      filter(value => value !== undefined),
    )

    // to select the profiles in loading
    this.loading$ = this.store$.pipe(
      select(ProfileListStoreSelectors.selectLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // to select the errors
    this.error$ = this.store$.pipe(
      select(ProfileListStoreSelectors.selectError),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

  }

  changeTypeOfCommunity(val: string): void {

    // switch type 
    this.typeOfCommunity = val
    this.store$.dispatch(new ProfileListStoreActions.ResetProfileList)
    this.store$.dispatch(new ProfileListStoreActions.GetProfileList(this.typeOfCommunity, 1))

  }

}
