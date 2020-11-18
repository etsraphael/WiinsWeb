import { ProfileFeatureStoreSelectors, RootStoreState } from 'src/app/root-store'
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { ProfileModel } from '../core/models/baseUser/profile.model'
import { filter, skipWhile, take } from 'rxjs/operators'
import { slideInProfile } from 'src/assets/route-animation/profile-animation'
import { CrooperImageValidationComponent } from '../core/modal/crooper-image-validation/crooper-image-validation.component'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss'],
  animations: [slideInProfile]
})

export class MyProfileComponent implements OnInit, OnDestroy {

  // get myprofile
  myprofile$: Observable<ProfileModel>
  myprofileSubscription: Subscription

  // profile upload
  pictureProfile: any
  pictureCover: any
  uploadSpace: string
  @ViewChild('cover', { static: false }) coverPicture: ElementRef;
  @ViewChild('profile', { static: false }) profilePicture: ElementRef;

  // ngrx store
  updatepicture: string

  // dialog
  dialogRef: MatDialogRef<CrooperImageValidationComponent> = null
  dialogS: Subscription

  constructor(
    private store$: Store<RootStoreState.State>,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val == null),
      filter(value => value !== undefined),
    )

    // to get the picture url
    this.myprofileSubscription = this.myprofile$.subscribe(profile => {
      this.pictureProfile = profile.pictureprofile
      this.pictureCover = profile.picturecover
    })

  }

  previewProfile(event: any) {
    // to change the profile picture
    this.updatepicture = 'profile'
    this.openCrooperProfile(event)
  }

  previewCover(event: Event) {
    // to change the cover picture
    this.updatepicture = 'cover'
    this.openCrooperProfile(event)
  }

  avatarInitialize() {
    // to reset the profile picture
    this.profilePicture.nativeElement.value = null
    this.myprofile$.pipe(take(1)).subscribe(profile => {
      this.pictureProfile = profile.pictureprofile
    })
  }

  coverInitialize() {
    // to reset the cover picture
    this.coverPicture.nativeElement.value = null
    this.myprofile$.pipe(take(1)).subscribe(profile => {
      this.pictureCover = profile.picturecover
    })
  }

  prepareRoute(outlet: RouterOutlet) {
    // to animate the router
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

  openCrooperProfile(file: Event | any) {

    // to open the crooper modal
    this.dialogRef = this.dialog.open(CrooperImageValidationComponent, {
      disableClose: true,
      backdropClass: '.no-backdrop',
      panelClass: ['col-md-4', 'ml-auto', 'mt-auto', 'mb-4'],
      data: { file, type: this.updatepicture }
    })

    // to see update during the resizing
    this.dialogS = this.dialogRef.componentInstance.fileUpdate.subscribe((result: any) => {
      if (!result) { this.avatarInitialize(); this.coverInitialize(); return null }
      if (!!result.picture) {
        if (this.updatepicture == 'profile') this.pictureProfile = result.picture
        if (this.updatepicture == 'cover') this.pictureCover = result.picture
        return null
      }
    })

    // unsubscribe after close the modal
    this.dialogRef.afterClosed().subscribe(() => this.dialogS.unsubscribe())

  }

  ngOnDestroy() {
    // unsubscribe all the var
    this.myprofileSubscription.unsubscribe()
  }

}
