import { Component, OnInit, OnDestroy } from '@angular/core'
import { RootStoreState, FeedPublicationStoreActions, FeedPublicationStoreSelectors } from 'src/app/root-store'
import { select, Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model'
import { ActivatedRoute } from '@angular/router'
import { filter, skipWhile } from 'rxjs/operators'
import { NgxMasonryOptions } from 'ngx-masonry'

@Component({
  selector: 'app-page-story',
  templateUrl: './page-story.component.html',
  styleUrls: ['./page-story.component.scss']
})

export class PageStoryComponent implements OnInit, OnDestroy {

  // page
  publication$: Observable<FeedPublication[]>;
  loading$: Observable<boolean>

  // space
  space = 'feed-page'

  // masonry
  optionMasonry: NgxMasonryOptions = {
    resize: true,
    horizontalOrder: true,
    originLeft: false
  }

  // showPage
  counterPage = 1

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    // to load the publications store
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', `page/${this.route.parent.snapshot.paramMap.get('id')}`))

    // to select the publications
    this.publication$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectAllItems),
      filter(value => value !== undefined),
    )

    // to select the loading logo
    this.loading$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

  }

  onScroll() {
    // to load the next page of the publications
    this.counterPage += 1
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication(
      String(this.counterPage),
      `page/${this.route.parent.snapshot.paramMap.get('id')}`
    ))
  }

  ngOnDestroy(): void {
    // to reset the publications
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)
  }

}
