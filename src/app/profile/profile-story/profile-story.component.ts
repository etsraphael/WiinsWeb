import { ProfileModel } from 'src/app/core/models/baseUser/profile.model'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { FeedPublication } from '../../core/models/publication/feed/feed-publication.model'
import { Store, select } from '@ngrx/store'
import {
  RootStoreState, ProfileFeatureStoreState, ProfileFeatureStoreSelectors,
  FeedPublicationStoreActions, FeedPublicationStoreSelectors
} from 'src/app/root-store'
import { filter, skipWhile } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'
import { NgxMasonryOptions } from 'ngx-masonry'

@Component({
  selector: 'app-profile-story',
  templateUrl: './profile-story.component.html',
  styleUrls: ['./profile-story.component.scss']
})

export class ProfileStoryComponent implements OnInit, OnDestroy {

  // default
  space: string = 'profile'

  // publication
  publication$: Observable<FeedPublication[]>
  publicationError$: Observable<string>
  loading$: Observable<boolean>

  // profile page
  profilePage$: Observable<ProfileModel>

  // masonry
  optionMasonry: NgxMasonryOptions = {
    horizontalOrder: true,
    resize: true,
  }

  // showPage
  counterPage = 1

  // profile page
  profile$: Observable<ProfileModel>

  constructor(
    private store$: Store<RootStoreState.State>,
    private profilePageStore$: Store<ProfileFeatureStoreState.StateProfilePage>,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    //  select the profile page
    this.profilePage$ = this.profilePageStore$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfilePage),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // load pubblications profile
    const profileID = this.activatedRoute.parent.snapshot.paramMap.get('id')

    // load the profile publication
    this.loadFeedPublication(profileID)

  }

  loadFeedPublication(id: string) {

    // load the publications
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', 'profile/' + id));

    // select the publications
    this.publication$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectAllItems),
      filter(value => value !== undefined)
    )

    // select the loading progressing
    this.loading$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // select the error of the publications
    this.publicationError$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectError),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // select the profile
    this.profile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfilePage),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    )

  }

  onScroll() {
    // get the next page of publication
    this.counterPage += 1
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication(
      String(this.counterPage),
      'profile/' + this.activatedRoute.parent.snapshot.paramMap.get('id')
    ))
  }

  ngOnDestroy(): void {
    // reset all the publications
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)
  }

}
