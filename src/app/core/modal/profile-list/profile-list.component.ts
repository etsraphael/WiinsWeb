import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { RootStoreState, ProfileListStoreActions, ProfileListStoreSelectors } from 'src/app/root-store';
import { Observable } from 'rxjs';
import { skipWhile, filter } from 'rxjs/operators';
import { ProfileModel } from '../../models/baseUser/profile.model';
import { PageModel } from '../../models/page/page.model';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})

export class ProfileListComponent implements OnInit, OnDestroy {

  // list
  resultsProfile$: Observable<ProfileModel[] | PageModel[]>
  loadingProfile$: Observable<Boolean>

  constructor(
    public dialogRef: MatDialogRef<ProfileListComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GetListSearch,
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit(): void {

    switch (this.data.categorie) {
      case 'member-group':
        this.store$.dispatch(new ProfileListStoreActions.GetGroupMember(this.data.id, 1, this.data.total_profile))
        break;
        case 'liked-list':
          this.store$.dispatch(new ProfileListStoreActions.GetLikedList(this.data.id, 1))
        break;
      default: break;
    }

    this.resultsProfile$ = this.store$.pipe(
      select(ProfileListStoreSelectors.selectAllItems),
      skipWhile(val => val.length == 0),
      filter(val => !!val)
    )

    this.loadingProfile$ = this.store$.pipe(
      select(ProfileListStoreSelectors.selectLoading),
      skipWhile(val => val == null),
      filter(value => value !== undefined)
    )

  }

  ngOnDestroy(): void {
    this.store$.dispatch(new ProfileListStoreActions.ResetProfileList)
  }

}

export interface GetListSearch {
  id: string,
  categorie: string,
  total_profile: number
}
