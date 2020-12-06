import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { RootStoreState, FeedPublicationStoreActions, FeedPublicationStoreSelectors } from 'src/app/root-store'
import { Observable } from 'rxjs'
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model'
import { environment } from 'src/environments/environment'
import { skipWhile, filter } from 'rxjs/operators'

@Component({
  selector: 'app-my-profile-story',
  templateUrl: './my-profile-story.component.html',
  styleUrls: ['./my-profile-story.component.scss']
})

export class MyProfileStoryComponent implements OnInit, OnDestroy {

  // default
  baseUrl = environment.baseUrl;

  // publication
  loading$: Observable<boolean>
  publication$: Observable<FeedPublication[]>;

  // space
  space: string = 'feed-my-profile'

  // masonry
  optionMasonry = {
    originLeft: true,
    transitionDuration: '1s',
    resize: true,
    horizontalOrder: true,
  }

  // showPage
  counterPage = 1

  constructor(
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit() {

    // to load the publications
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', 'myfeedpublication'))

    // to select the publications
    this.publication$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectAllItems),
      filter(value => value !== undefined),
    )

    // to show the loading bar
    this.loading$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

  }

  onScroll() {
    // to get the next page
    this.counterPage += 1
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication(String(this.counterPage), 'myfeedpublication'))
  }

  ngOnDestroy(): void {
    // to reset all the publications
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)
  }

}
