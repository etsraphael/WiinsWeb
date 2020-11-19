import { AdminModel, OneRolePage } from '../../core/models/page/admin.model'
import { Component, OnInit } from '@angular/core'
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { filter, debounceTime, distinctUntilChanged, skipWhile, map } from 'rxjs/operators'
import { Store, select } from '@ngrx/store'
import { RootStoreState, ProfileFeatureStoreSelectors, SearchProfileStoreActions, SearchProfileStoreSelectors, PageFeatureStoreActions, PageFeatureStoreSelectors } from 'src/app/root-store'
import { Observable, Subscription, combineLatest } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { PageModel } from 'src/app/core/models/page/page.model'
import { TranslateService } from '@ngx-translate/core'
import { CrooperImageValidationComponent } from 'src/app/core/modal/crooper-image-validation/crooper-image-validation.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { categoriePage } from 'src/app/core/data/categorie-page'

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})

export class CreatePageComponent implements OnInit {

  // my profile
  myProfileID: string

  // search bar
  resultsProfile$: Observable<ProfileModel[]>
  searchField: FormControl

  // team
  adminAdded: AdminPage[] = []
  roleAdmin = [
    { role: 'Manageurs', code: 1 },
    { role: 'Moderateurs', code: 2 }
  ]

  // form
  pageForm: FormGroup
  pageName: string

  // upload file
  filePath: string
  imgCover: string | ArrayBuffer
  imgProfile: string | ArrayBuffer
  avatarUrl: string
  coverUrl: string

  // upluoad
  myprofile$: Observable<ProfileModel>

  // dialog
  dialogRef: MatDialogRef<CrooperImageValidationComponent> = null
  dialogS: Subscription
  updatepicture: string

  // page
  loading$: Observable<boolean>

  // categorie
  categoriePage: number = 0
  subcategoriePage: number = 0
  categoriePageData = categoriePage

  constructor(
    private store$: Store<RootStoreState.State>,
    public activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    public dialog: MatDialog,
  ) {
    this.myProfileID = activatedRoute.parent.parent.snapshot.data['loadedUser'].profile;
  }

  ngOnInit() {

    // search the profile
    this.searchField = new FormControl()

    // listener on the input
    this.searchField.valueChanges.pipe(
      filter(value => value !== undefined),
      filter(value => value !== ''),
      filter(value => value.length > 3),
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe(val => this.store$.dispatch(new SearchProfileStoreActions.SearchProfile(val, 'TeamPageCreation')))

    // select the friends
    this.resultsProfile$ = combineLatest(
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSearchResults)),
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSpot))
    ).pipe(skipWhile(val => val[1] !== 'TeamPageCreation'), map(val => val[0]))

    // intialise the form
    this.pageForm = new FormGroup({
      name: new FormControl('', Validators.required),
    })

    // to select the profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val === null),
      filter(profile => !!profile),
    )

    // to select the page in loading
    this.loading$ = this.store$.pipe(
      select(PageFeatureStoreSelectors.selectIsLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

  }

  get f() { return this.pageForm.controls }

  addAdmin(profile: ProfileModel): void {

    // check if the user is already on the list
    if (this.adminAdded.map(x => x.profile._id).includes(profile._id) ||
      profile._id == this.myProfileID) {
      this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Th-person-is-already-a-member'),
        this.translate.instant('CORE.close'), {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      });
    }
    // add on the list
    else { this.adminAdded.push({ profile: profile, role: 2 }) }

    // reset the input and the store
    this.searchField.setValue('')
    this.store$.dispatch(new SearchProfileStoreActions.ResetSearch)

  }

  updateRole(profileId: string, role: number): void {
    // change the role
    const indexprofile = this.adminAdded.map(x => x.profile._id).indexOf(profileId)
    this.adminAdded[indexprofile].role = role
  }

  removeAddAdmin(profileId: string) {
    // pull an admin
    this.adminAdded = this.adminAdded.filter(obj => obj.profile._id !== profileId);
  }

  submit() {

    // verify the title
    if (this.pageForm.invalid) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Please-add-a-page-name-valid'),
        this.translate.instant('CORE.close'), {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      })
    }

    // verify the file
    if (!this.avatarUrl || !this.coverUrl) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Please-add-page-photo'),
        this.translate.instant('CORE.close'), {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      })
    }

    // verify the categorie
    if (!this.categoriePage || !this.subcategoriePage) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Please-choose-cat-and-sub'),
        this.translate.instant('CORE.close'), {
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 5000,
      })
    }


    // contruct the new page
    const newPage = new PageModel(
      this.pageForm.get('name').value,
      Number(String(this.categoriePage + '.' + this.subcategoriePage)),
      this.avatarUrl,
      this.coverUrl,
      this.createTeam()
    )

    // send the new group
    this.store$.dispatch(new PageFeatureStoreActions.CreatPage(newPage))

  }

  previewCover(event: any) {

    if (!event) return null
    this.updatepicture = 'cover-page'

    // open the crooper modal 
    this.openCrooperProfile(event)

  }

  previewProfile(event: any) {

    if (!event) return null
    this.updatepicture = 'profile-page'

    // open the crooper modal 
    this.openCrooperProfile(event)

  }

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

  openCrooperProfile(file: Event | any) {

    // open the crooper modal
    this.dialogRef = this.dialog.open(CrooperImageValidationComponent, {
      disableClose: true,
      backdropClass: '.no-backdrop',
      panelClass: ['col-md-4', 'ml-auto', 'mt-auto', 'mb-4'],
      data: { file, type: this.updatepicture }
    })

    // listener to update the picture during the resizing
    this.dialogS = this.dialogRef.componentInstance.fileUpdate.subscribe((result: any) => {

      if (!result) {
        if (this.updatepicture == 'profile-page') this.imgProfile = null
        if (this.updatepicture == 'cover-page') this.imgCover = null
        return null
      }

      if (!!result.picture) {
        if (this.updatepicture == 'profile-page') this.imgProfile = result.picture
        if (this.updatepicture == 'cover-page') this.imgCover = result.picture
        return null
      }

      if (!!result.url) {
        if (this.updatepicture == 'profile-page') this.avatarUrl = result.url
        if (this.updatepicture == 'cover-page') this.coverUrl = result.url
      }

    })

    // unsubscribe after close the modal
    this.dialogRef.afterClosed().subscribe(() => this.dialogS.unsubscribe())

  }

  resetSubCategorie(): void {
    this.subcategoriePage = 0
  }

}

export interface AdminPage {
  profile: ProfileModel
  role: number;
}