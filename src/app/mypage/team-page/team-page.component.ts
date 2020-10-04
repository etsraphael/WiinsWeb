import { Component, OnInit, OnDestroy } from '@angular/core'
import { AdminPage } from 'src/app/core/models/page/admin.model'
import { TeamUpdate } from 'src/app/core/models/confirmation/teamUpdate'
import { Observable, Subscription, combineLatest } from 'rxjs'
import { RootStoreState, AdminsFeatureStoreSelectors, ProfileFeatureStoreSelectors, SearchProfileStoreActions, SearchProfileStoreSelectors } from 'src/app/root-store'
import { skipWhile, filter, debounceTime, distinctUntilChanged, take, map } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { ActivatedRoute } from '@angular/router'
import { FormControl } from '@angular/forms'
import { MatDialog, MatSnackBar } from '@angular/material'
import { ManagementTeamComponent } from 'src/app/core/modal/management-team/management-team.component'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})

export class TeamPageComponent implements OnInit, OnDestroy {

  // my profile
  myprofile$: Observable<ProfileModel>;

  // search
  searchField: FormControl;
  resultsProfile$: Observable<ProfileModel[]>;

  // admins
  admins$: Observable<AdminPage>;
  admins: IMember[];
  adminSubscription: Subscription;

  // my role
  myrole: string;

  constructor(
    private store$: Store<RootStoreState.State>,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    )

    // to select the admins
    this.admins$ = this.store$.pipe(
      select(AdminsFeatureStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    )

    // set the role for team
    this.adminSubscription = this.admins$.subscribe(data => {
      this.admins = []
      this.admins.push(new IMember(1, data.president))
      for (let ma of data.managers) { this.admins.push(new IMember(2, ma)) }
      for (let mo of data.moderators) { this.admins.push(new IMember(3, mo)) }
    })

    // get my role
    this.myrole = this.activatedRoute.parent.snapshot.data['loadedPage']

    // search
    this.searchField = new FormControl()

    // listener on the search
    this.searchField.valueChanges.pipe(
      filter(value => value !== undefined),
      filter(value => value !== ''),
      filter(value => value.length > 3),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(val => this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'TeamUpdatePage')))

    // friends
    this.resultsProfile$ = combineLatest(
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSearchResults)),
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSpot))
    ).pipe(skipWhile(val => val[1] !== 'TeamUpdatePage'), map(val => val[0]))

  }

  openModal(profileID: string, categorie: string, oldRole: number) {

    // check the role before open the modal
    if (this.myrole == 'pr' && categorie == 'leave') {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.you-hav-to-upgrad-a-manager-before-leave'),
        this.translate.instant('CORE.close'),
        {
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
          duration: 5000,
        }
      )

    }

    if (oldRole == 2) categorie = 'replacePr'

    return this.admins$.pipe(take(1)).subscribe(data => {
      this.dialog.open(ManagementTeamComponent, {
        panelClass: 'col-3',
        data: new TeamUpdate(data._id, profileID, categorie)
      })
    })
  }

  addAdmin(profile: ProfileModel) {

    // to reset the search
    this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)

    // verification
    this.admins$.pipe(take(1)).subscribe(data => {
      if (profile._id == data.president._id
        || data.managers.map(x => x._id).includes(profile._id)
        || data.moderators.map(x => x._id).includes(profile._id)
      ) {
        return this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.Th-person-is-already-a-member'),
          this.translate.instant('CORE.close'),
          {
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
            duration: 5000,
          }
        )
      }
    })

    // open the modal
    return this.admins$.pipe(take(1)).subscribe(data => {
      this.dialog.open(ManagementTeamComponent, {
        panelClass: 'col-3',
        data: new TeamUpdate(data._id, profile._id, 'add')
      })
    })

  }

  ngOnDestroy() {
    // unsubscribe all var
    if (this.adminSubscription) this.adminSubscription.unsubscribe()
  }

}

export class IMember {
  constructor(public role: number, public profile: ProfileModel) { }
}

