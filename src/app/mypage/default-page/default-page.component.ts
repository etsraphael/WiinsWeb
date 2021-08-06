import { Component, OnInit, OnDestroy } from '@angular/core'
import { filter, skipWhile } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'
import { RootStoreState, FeedPublicationStoreActions, FeedPublicationStoreSelectors } from 'src/app/root-store'
import { ActivatedRoute } from '@angular/router'
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model'
import { NgxMasonryOptions } from 'ngx-masonry'

@Component({
  selector: 'app-default-page',
  templateUrl: './default-page.component.html',
  styleUrls: ['./default-page.component.scss']
})

export class DefaultPageComponent implements OnInit, OnDestroy  {

  // default
  pageId: string
  publication$: Observable<FeedPublication[]>
  loading$: Observable<boolean>

  // user
  myrole: string

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
    private route: ActivatedRoute,
    public activatedRoute: ActivatedRoute,
  ) { this.myrole = activatedRoute.parent.snapshot.data['loadedPage'] }

  ngOnInit() {
    
    // to get the id in the url
    this.pageId = this.route.parent.snapshot.paramMap.get('id')

    // to select all the publications
    this.publication$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectAllItems),
      filter(value => value !== undefined),
    )

    // to select the loading progressing
    this.loading$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // to load all the publications
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', `page/${this.route.parent.snapshot.paramMap.get('id')}`))

  }

  onScroll() {
    // to get the next page of publication
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
