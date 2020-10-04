import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { Store, select } from '@ngrx/store';
import { RootStoreState, ProfileFeatureStoreSelectors } from 'src/app/root-store';
import { filter, skipWhile } from 'rxjs/operators';
import { TubePageModel } from 'src/app/core/models/tube/tubePage.model'
import { ActivatedRoute } from '@angular/router';
import { TubePageStoreActions, TubePageStoreSelectors } from 'src/app/root-store/tube-page-store';

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
    private route: ActivatedRoute  
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

}
