import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { Store, select } from '@ngrx/store';
import { RootStoreState, ProfileFeatureStoreSelectors } from 'src/app/root-store';
import { filter, skipWhile, take } from 'rxjs/operators';
import { TubePageModel } from 'src/app/core/models/tube/tubePage.model'
import { ActivatedRoute } from '@angular/router';
import { TubePageStoreActions, TubePageStoreSelectors } from 'src/app/root-store/tube-page-store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { ValidationsComponent } from 'src/app/core/modal/validations/validations.component';
import { ReportModalComponent } from 'src/app/core/modal/report-modal/report-modal.component';

@Component({
  selector: 'app-watching-video',
  templateUrl: './watching-video.component.html',
  styleUrls: ['./watching-video.component.scss']
})

export class WatchingVideoComponent implements OnInit {

  // profile
  myprofile: Observable<ProfileModel>

  // page
  tubePage$: Observable<TubePageModel>
  error$: Observable<string>
  loading$: Observable<boolean>
  
  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {

    // to load my profile
    this.myprofile = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      filter(profile => !!profile),
      skipWhile(val => val == null)
    )

    // to load the tube page
    this.store$.dispatch(new TubePageStoreActions.LoadPageTube(this.route.snapshot.paramMap.get('id')))

    // to select the tube page
    this.tubePage$ = this.store$.pipe(
      select(TubePageStoreSelectors.select),
      filter(value => !!value),
      skipWhile(val => val == null)
    )

    // to show the loading animation
    this.loading$ = this.store$.pipe(
      select(TubePageStoreSelectors.selectIsLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // to show the error 
    this.error$ = this.store$.pipe(
      select(TubePageStoreSelectors.selectError),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

  }

  changeTube(tubeId: string){
    this.store$.dispatch(new TubePageStoreActions.ResetPageTube)
    this.store$.dispatch(new TubePageStoreActions.LoadPageTube(tubeId))
  }

  supportMessage(){
    const errorModal = this._snackBar.open(
      this.translate.instant('DONATION.Function-unavailable-at-the-moment-join-our-discord-to-help-with-creation'),
      this.translate.instant('CORE.Join'), {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 8000
    })

    errorModal.onAction().subscribe(() => window.open('https://discord.gg/jMyc443', '_blank'))
  }

  unfollow(): Subscription {
    return this.tubePage$.pipe(take(1)).subscribe((data: TubePageModel) => {
      return this.dialog.open(ValidationsComponent, {
        panelClass: ['col-md-4', 'col-xl-4'],
        data: { id: data.tube.profile._id, type: 'unfollow-from-tube' }
      })
    })
  }

  deleteFriend(): Subscription{
    return this.tubePage$.pipe(take(1)).subscribe((data: TubePageModel) => {
      return this.dialog.open(ValidationsComponent, {
        panelClass: ['col-md-4', 'col-xl-4'],
        data: { id: data.tube.profile._id, type: 'delete-friend-from-tube' }
      })
    })
  }

  follow(): Subscription {
    return this.tubePage$.pipe(take(1)).subscribe((data: TubePageModel) => {
      return this.store$.dispatch(new TubePageStoreActions.FollowProfile(data.tube.profile._id))
    })
  }

  report(): Subscription {
    // open the modal to report the tube
    return this.tubePage$.pipe(take(1)).subscribe((data: TubePageModel) => {
      return this.dialog.open(ReportModalComponent, {
        panelClass: ['col-md-10'],
        data: { tube: data.tube, type: 'tube-report' }
      })
    })
  }

}
