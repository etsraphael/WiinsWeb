import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootStoreState, TubeFeedStoreActions, TubeFeedStoreSelectors } from 'src/app/root-store';
import { ActivatedRoute } from '@angular/router';
import { TubeModel } from 'src/app/core/models/tube/tube.model';
import { Observable } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { TranslationService } from 'src/app/core/services/translation/translation.service';

@Component({
  selector: 'app-profile-tube',
  templateUrl: './profile-tube.component.html',
  styleUrls: ['./profile-tube.component.scss']
})

export class ProfileTubeComponent implements OnDestroy, OnInit {

  // tube
  tube$: Observable<TubeModel[]>
  error$: Observable<string>
  loading$: Observable<boolean>

  // showPage
  counterPage = 1

  constructor(
    private store$: Store<RootStoreState.State>,
    private activatedRoute: ActivatedRoute,
    public translateService: TranslationService,
  ) { }

  ngOnInit(): void {

    // to get the id
    const profileID = this.activatedRoute.parent.snapshot.paramMap.get('id')

    // to load the tubes
    this.store$.dispatch(new TubeFeedStoreActions.LoadTubeFeed(this.counterPage, profileID))

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

}
