import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable, Subscription, combineLatest } from 'rxjs'
import { Store, select } from '@ngrx/store'
import {
  RootStoreState, SearchProfileStoreActions, GroupFeatureStoreActions,
  SearchProfileStoreSelectors, ProfileFeatureStoreSelectors
} from 'src/app/root-store'
import { filter, skipWhile, debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { AdminModel, OneRolePage } from 'src/app/core/models/page/admin.model'
import { ActivatedRoute } from '@angular/router'
import { AdminPage } from '../create-page/create-page.component'
import { GroupModel } from 'src/app/core/models/group/group.model'
import { TranslateService } from '@ngx-translate/core'
import { CrooperImageValidationComponent } from 'src/app/core/modal/crooper-image-validation/crooper-image-validation.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.scss']
})

export class CreateGroupComponent implements OnInit {

  // uploaded
  avatarGroup = 'https://eps-file-default.s3.eu-west-3.amazonaws.com/cover_default_user.png'
  avatarSaved: string

  // form
  groupForm: FormGroup

  // search bar
  resultsProfile$: Observable<ProfileModel[]>
  searchField: FormControl

  // team
  adminAdded: AdminPage[] = []
  roleAdmin = [
    { role: 'Manageurs', code: 1 },
    { role: 'Moderateurs', code: 2 }
  ]

  // profile
  myProfileID: string
  myprofile$: Observable<ProfileModel>

  // dialog
  dialogRef: MatDialogRef<CrooperImageValidationComponent> = null
  dialogS: Subscription

  constructor(
    private store$: Store<RootStoreState.State>,
    public activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialog: MatDialog
  ) {
    this.myProfileID = activatedRoute.parent.parent.snapshot.data['loadedUser'].profile;
  }

  ngOnInit() {

    // to select the profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val === null),
      filter(profile => !!profile),
    )

    // group form
    this.groupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      visibility: new FormControl('', Validators.required)
    })

    // search the profile
    this.searchField = new FormControl()

    // to update the suggestion
    this.searchField.valueChanges.pipe(
      filter(value => value !== undefined),
      filter(value => value !== ''),
      filter(value => value.length > 3),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(val => this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'GroupTeam')))

    // to selects the friends
    this.resultsProfile$ = combineLatest(
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSearchResults)),
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSpot))
    ).pipe(skipWhile(val => val[1] !== 'GroupTeam'), map(val => val[0]))

  }

  get f() { return this.groupForm.controls }

  previewProfile(file: any) {
    // to open open the crooper modal
    if (file.length === 0) return null
    this.openCrooperProfile(event)
  }

  addAdmin(profile: ProfileModel): void {
    if (this.adminAdded.map(x => x.profile._id).includes(profile._id) ||
      profile._id == this.myProfileID) {
      this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Th-person-is-already-a-member'),
        this.translate.instant('CORE.close'), {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
    } else {
      this.adminAdded.push({ profile: profile, role: 2 })
    }
    this.searchField.setValue('')
    this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)
  }

  // update the role
  updateRole(profileId: string, role: number): void {
    const indexprofile = this.adminAdded.map(x => x.profile._id).indexOf(profileId)
    this.adminAdded[indexprofile].role = role
  }

  // remove the role
  removeAddAdmin(profileId: string) {
    this.adminAdded = this.adminAdded.filter(obj => obj.profile._id !== profileId);
  }

  // open the crooper
  openCrooperProfile(file: Event | any) {

    this.dialogRef = this.dialog.open(CrooperImageValidationComponent, {
      disableClose: true,
      backdropClass: '.no-backdrop',
      panelClass: ['col-md-4', 'ml-auto', 'mt-auto', 'mb-4'],
      data: { file, type: 'profile-group' }
    })

    this.dialogS = this.dialogRef.componentInstance.fileUpdate.subscribe((result: any) => {
      if (!result) { this.avatarGroup = 'https://eps-file-default.s3.eu-west-3.amazonaws.com/cover_default_user.png'; return null }
      if (!!result.picture) { this.avatarGroup = result.picture; return null }
      if (!!result.url) { this.avatarSaved = result.url; return null }
    })

    this.dialogRef.afterClosed().subscribe(() => this.dialogS.unsubscribe())

  }

  // create the group
  createTeam(): AdminModel {

    let team: OneRolePage[] = []

    // add me first
    team.push(new OneRolePage(this.myProfileID, 0))

    // add friends
    for (let a of this.adminAdded) {
      team.push(new OneRolePage(a.profile._id, a.role))
    }

    return new AdminModel(team)
  }

  // create the group
  sendGroup() {

    // check all the valid information
    if (this.groupForm.invalid) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Please-enter-missing-informations'),
        this.translate.instant('CORE.close'), {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      })
    }

    // check if the a picture is uploaded
    if (this.avatarGroup == 'https://eps-file-default.s3.eu-west-3.amazonaws.com/cover_default_user.png' || this.avatarSaved == null) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Please-add-group-photo'),
        this.translate.instant('CORE.close'), {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      })
    }

    // construct the object
    const newGroupe = new GroupModel(
      this.groupForm.get('name').value,
      this.avatarSaved,
      this.groupForm.get('visibility').value,
      this.createTeam()
    )

    // send the action
    this.store$.dispatch(new GroupFeatureStoreActions.CreatGroup(newGroupe))

  }

  // create the file
  urltoFile(url: string, filename: string, mimeType: string): Promise<any> {
    return (fetch(url)
      .then(res => res.arrayBuffer())
      .then(buf => new File([buf], filename, { type: mimeType }))
    )
  }

}
