import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { RootStoreState, OneGroupFeatureStoreActions, OneGroupFeatureStoreSelectors, SearchProfileStoreActions, SearchProfileStoreSelectors, ProfileFeatureStoreSelectors } from 'src/app/root-store'
import { ActivatedRoute } from '@angular/router'
import { FormGroup, FormControl } from '@angular/forms'
import { GroupModel } from 'src/app/core/models/group/group.model'
import { Observable, Subscription, combineLatest } from 'rxjs'
import { filter, skipWhile, debounceTime, distinctUntilChanged, map, take } from 'rxjs/operators'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { MemberGroupModel } from 'src/app/core/models/group/member-group.model'
import { TeamUpdate } from 'src/app/core/models/confirmation/teamUpdate'
import { GroupValidationComponent } from 'src/app/core/modal/group-validation/group-validation.component'
import { TranslateService } from '@ngx-translate/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-group-management',
  templateUrl: './group-management.component.html',
  styleUrls: ['./group-management.component.scss']
})

export class GroupManagementComponent implements OnInit, OnDestroy {

  // myprofile
  myprofile$: Observable<ProfileModel>

  // section open
  section = [false, false, false, false]

  // form
  groupForm: FormGroup

  // group
  group$: Observable<GroupModel>
  groupSubscription: Subscription
  members$: Observable<MemberGroupModel[]>

  // upload
  avatarGroup: string

  // search bar
  resultsProfile$: Observable<ProfileModel[]>
  searchField: FormControl

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    // load the admin
    this.store$.dispatch(new OneGroupFeatureStoreActions.LoadGroupAdmin(this.route.snapshot.paramMap.get('id')))

    // to select the group
    this.group$ = this.store$.pipe(
      select(OneGroupFeatureStoreSelectors.select),
      skipWhile(val => val == null),
      filter(value => value !== undefined),
    )

    // to select the members 
    this.members$ = this.store$.pipe(
      select(OneGroupFeatureStoreSelectors.selectMembers),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val == null),
      filter(value => value !== undefined),
    )

    // to update the picture groupe
    this.groupSubscription = this.group$.subscribe(action => {
      this.avatarGroup = action.pictureprofile
    })

    // info form
    this.groupForm = new FormGroup({
      name: new FormControl(''),
      visibility: new FormControl(''),
    })

    // search the profile
    this.searchField = new FormControl()

    // to listen the input
    this.searchField.valueChanges.pipe(
      filter(value => value !== undefined),
      filter(value => value !== ''),
      filter(value => value.length > 3),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(val => this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'GroupTeam')))

    // to select all friends suggestion
    this.resultsProfile$ = combineLatest(
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSearchResults)),
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSpot))
    ).pipe(skipWhile(val => val[1] !== 'GroupTeam'), map(val => val[0]))

  }

  get f() { return this.groupForm.controls }

  resetMainInfo() {
    // to reload the page
    window.location.reload()
  }

  toggleVisibility(index: number) {
    // to open the section
    this.section[index] = !this.section[index]
  }

  updateMainInfo(oldAvatar: string) {

    // to update change the picture
    let avatar = null
    if (oldAvatar !== this.avatarGroup) avatar = this.avatarGroup
    const group = new GroupModel(
      this.groupForm.get('name').value,
      avatar,
      this.groupForm.get('visibility').value,
      null,
      this.route.snapshot.paramMap.get('id')
    )

    // to update the store
    this.store$.dispatch(new OneGroupFeatureStoreActions.UpdateGroup(group))

  }

  previewProfile(file: any) {

    // to preview the picture
    if (file.length === 0) return null
    const reader = new FileReader()
    reader.readAsDataURL(file[0])

    // to send the picture
    // this.store$.dispatch(new UploadOneFileStoreActions.UploadRequestAction(file[0], 'eps-file-group-avatar'))

  }

  addMember(groupeID: string, profileID: string) {
    this.members$.pipe(take(1)).subscribe(data => {
      // to check if is already a member
      if (data.map(x => x.profile._id).includes(profileID)) {
        this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.Th-person-is-already-a-member'),
          this.translate.instant('CORE.close'), {
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          duration: 5000,
        })
      }
      // to update the store 
      else { this.store$.dispatch(new OneGroupFeatureStoreActions.SendRequestMember(groupeID, profileID)) }
    })
  }

  loadMember(groupe: GroupModel, page: number) {
    // to load the member
    if (this.section[3] == true) this.store$.dispatch(new OneGroupFeatureStoreActions.LoadMember(groupe._id, page, groupe.members_total))
    else this.store$.dispatch(new OneGroupFeatureStoreActions.resetMember)
  }

  deleteMember(groupeID: string, profileID: string): void {
    // to pull a admin in the team
    this.store$.dispatch(new OneGroupFeatureStoreActions.deleteMember(groupeID, profileID))
  }

  addAmin(profile: ProfileModel) {
    // to add an admin 
    this.group$.pipe(take(1)).subscribe(action => {
      this.store$.dispatch(
        new OneGroupFeatureStoreActions.ChangeRole(new TeamUpdate(action.admins._id, profile._id, 'add'), null)
      )
    })
  }

  updateGroup(id: string, categorie: string) {
    // to open the modal with the updating
    this.group$.pipe(take(1)).subscribe(action =>
      this.dialog.open(GroupValidationComponent, {
        panelClass: 'col-5', data: new TeamUpdate(action.admins._id, id, categorie)
      })
    )
  }

  alertReplacePr() {
    // modal to upgrade the manager before to leave
    this._snackBar.open(
      this.translate.instant('ERROR-MESSAGE.you-hav-to-upgrad-a-manager-before-leave'),
      this.translate.instant('CORE.close'), {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 5000,
    })
  }

  ngOnDestroy(): void {
    // unsubscribe all var
    this.groupSubscription.unsubscribe()
  }

}