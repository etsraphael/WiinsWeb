import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { FeedPublication } from '../core/models/publication/feed/feed-publication.model'
import { NgxMasonryOptions } from 'ngx-masonry'
import { Store, select } from '@ngrx/store'
import { RootStoreState, FeedPublicationStoreActions, FeedPublicationStoreSelectors } from '../root-store'
import { skipWhile, filter } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-space-discover',
  templateUrl: './space-discover.component.html',
  styleUrls: ['./space-discover.component.scss']
})

export class SpaceDiscoverComponent implements OnInit {

  // publication
  publication$: Observable<FeedPublication[]>
  error$: Observable<any>
  loading$: Observable<boolean>
  suggestList$: Observable<string[]>
  seletedHastag: string

  // showPage
  counterPage = 1

  // space
  space = 'feed-story'

  // masonry
  optionMasonry: NgxMasonryOptions = {
    horizontalOrder: true,
    resize: true,
  }

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {

    // to load the top of the publications
    this.store$.dispatch(new FeedPublicationStoreActions.LoadSuggestHastag)

    // to load the trend
    if (!this.route.snapshot.paramMap.get('name')) {
      this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', 'discover'))
    }
    // to load the publications list with an hastag
    else {
      this.seletedHastag = this.route.snapshot.paramMap.get('name')
      this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', 'discover/hastag/' + this.route.snapshot.paramMap.get('name')))
    }

    // to select the publications 
    this.publication$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectAllItems),
      skipWhile(val => val.length == 0),
      filter(value => value !== undefined),
    )

    // to select the loading when the publications is loading
    this.loading$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // to select the hastag list
    this.suggestList$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectSuggestList),
      filter(value => value !== undefined),
      skipWhile(val => val == null),
    )

  }

  resetTag(name: string) {
    // to reset all the hastag
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeedHastag)
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', 'discover/hastag/' + name))
    this.seletedHastag = name
    this.counterPage = 1
  }

  onScroll() {

    this.counterPage += 1

    // to scroll the trend
    if (!this.seletedHastag) {
      this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication(String(this.counterPage), 'discover'))
    }
    // to scroll the publications with an hastag
    else {
      this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication(String(this.counterPage), 'discover/hastag/' + this.route.snapshot.paramMap.get('name')))
    }

  }

  ngOnDestroy(): void {
    // to reset the publications
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)
  }

}
