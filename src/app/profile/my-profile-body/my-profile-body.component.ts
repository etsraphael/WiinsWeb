import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { CrooperImageValidationComponent } from 'src/app/core/modal/crooper-image-validation/crooper-image-validation.component';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { ProfileFeatureStoreSelectors, RootStoreState } from 'src/app/root-store';
import { slideInProfile } from 'src/assets/route-animation/profile-animation';

@Component({
  selector: 'app-my-profile-body',
  templateUrl: './my-profile-body.component.html',
  styleUrls: ['./my-profile-body.component.scss'],
  animations: [slideInProfile]
})

export class MyProfileBodyComponent implements OnInit, OnDestroy {

  // get myprofile
  myprofile$: Observable<ProfileModel>;
  myprofileSubscription: Subscription;

  // profile upload
  pictureProfile: any;
  pictureCover: any;
  uploadSpace: string;
  @ViewChild('cover', { static: false }) coverPicture: ElementRef;
  @ViewChild('profile', { static: false }) profilePicture: ElementRef;

  // ngrx store
  updatepicture: string;

  // dialog
  dialogRef: MatDialogRef<CrooperImageValidationComponent> = null;
  dialogS: Subscription;

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
    );

    // to get the picture url
    this.myprofileSubscription = this.myprofile$.subscribe(profile => {
      this.pictureProfile = profile.pictureprofile;
      this.pictureCover = profile.picturecover;
    });

  }

  previewProfile(event: any) {
    // to change the profile picture
    this.updatepicture = 'profile';
    this.openCrooperProfile(event);
  }

  previewCover(event: Event) {
    // to change the cover picture
    this.updatepicture = 'cover';
    this.openCrooperProfile(event);
  }

  avatarInitialize() {
    // to reset the profile picture
    this.profilePicture.nativeElement.value = null;
    this.myprofile$.pipe(take(1)).subscribe(profile => {
      this.pictureProfile = profile.pictureprofile;
    });
  }

  coverInitialize() {
    // to reset the cover picture
    this.coverPicture.nativeElement.value = null;
    this.myprofile$.pipe(take(1)).subscribe(profile => {
      this.pictureCover = profile.picturecover;
    });
  }

  prepareRoute(outlet: RouterOutlet) {
    // to animate the router
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['Story']
  }

  openCrooperProfile(file: Event | any) {

    // to open the crooper modal
    this.dialogRef = this.dialog.open(CrooperImageValidationComponent, {
      disableClose: true,
      backdropClass: '.no-backdrop',
      panelClass: ['col-md-4', 'ml-auto', 'mt-auto', 'mb-4'],
      data: { file, type: this.updatepicture }
    });

    // to see update during the resizing
    this.dialogS = this.dialogRef.componentInstance.fileUpdate.subscribe((result: any) => {
      if (!result) { this.avatarInitialize(); this.coverInitialize(); return null; }
      if (!!result.picture) {
        if (this.updatepicture == 'profile') this.pictureProfile = result.picture;
        if (this.updatepicture == 'cover') this.pictureCover = result.picture;
        return null;
      }
    });

    // unsubscribe after close the modal
    this.dialogRef.afterClosed().subscribe(() => this.dialogS.unsubscribe());

  }

  ngOnDestroy() {
    // unsubscribe all the var
    this.myprofileSubscription.unsubscribe();
  }


}
