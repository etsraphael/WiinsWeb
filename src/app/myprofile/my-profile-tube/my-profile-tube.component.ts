import { Component, OnDestroy, OnInit } from '@angular/core';
import { TubeModel } from 'src/app/core/models/tube/tube.model';
import { Observable } from 'rxjs';
import { RootStoreState, TubeFeedStoreSelectors, TubeFeedStoreActions } from 'src/app/root-store';
import { Store, select } from '@ngrx/store';
import { filter, skipWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { MatDialog } from '@angular/material/dialog';
;
import { ValidationsComponent } from 'src/app/core/modal/validations/validations.component';

@Component({
  selector: 'app-my-profile-tube',
  templateUrl: './my-profile-tube.component.html',
  styleUrls: ['./my-profile-tube.component.scss']
})

export class MyProfileTubeComponent implements OnDestroy, OnInit {

  // tube
  tube$: Observable<TubeModel[]>
  error$: Observable<string>
  loading$: Observable<boolean>

  // showPage
  counterPage = 1

  constructor(
    private store$: Store<RootStoreState.State>,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    public translateService: TranslationService
  ) { }

  ngOnInit(): void {

    // to get my profile id 
    const profileId = this.activatedRoute.parent.parent.snapshot.data['loadedUser'].profile

    // to load the tubes
    this.store$.dispatch(new TubeFeedStoreActions.LoadTubeFeed(this.counterPage, profileId))

    // to select the tubes
    this.tube$ = this.store$.pipe(
      select(TubeFeedStoreSelectors.selectAllItems),
      filter(value => value !== undefined),
    )

    // to show the loading error
    this.loading$ = this.store$.pipe(
      select(TubeFeedStoreSelectors.selectIsLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // to show an error
    this.error$ = this.store$.pipe(
      select(TubeFeedStoreSelectors.selectError),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

  }

  ngOnDestroy(): void {
    this.store$.dispatch(new TubeFeedStoreActions.ResetTubeFeed)
  }

  openDeletionModal(id: string) {
    // to open the modal to leave the group
    this.dialog.open(ValidationsComponent, {
      panelClass: ['col-md-4'],
      data: { id , type: 'delete-tube'  }
    })
  }

}
