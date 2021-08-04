import { RootStoreState, FeedPublicationStoreActions, FeedPublicationStoreSelectors } from 'src/app/root-store'
import { Component, OnInit, OnDestroy } from '@angular/core'
import { Observable } from 'rxjs'
import { FeedPublication } from '../core/models/publication/feed/feed-publication.model'
import { Store, select } from '@ngrx/store'
import { filter, skipWhile } from 'rxjs/operators'
import { NgxMasonryOptions } from 'ngx-masonry'

@Component({
  selector: 'app-space-story',
  templateUrl: './space-story.component.html',
  styleUrls: ['./space-story.component.scss'],
})

export class SpaceStoryComponent implements OnInit, OnDestroy {

  // publications
  publication$: Observable<FeedPublication[]>
  error$: Observable<any>
  loading$: Observable<boolean>

  // showPage
  counterPage = 1

  // space
  space = 'feed-story'

  // masonry
  optionMasonry: NgxMasonryOptions = {
    resize: true,
    originLeft: false
  }

  constructor(
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit() {

    // to load the publications
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', 'FollowerAndFriend'))

    // to select the publications
    this.publication$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectAllItems),
      filter(value => value !== undefined),
    )

    // to show the loading error
    this.loading$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // to show an error
    this.error$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectError),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

  }

  onScroll() {
    // to load the next page
    this.counterPage += 1
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication(String(this.counterPage), 'FollowerAndFriend'))
  }

  ngOnDestroy(): void {
    // to reset the publications
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)
  }

}
