import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { RootStoreState, FeedPublicationStoreActions, FeedPublicationStoreSelectors, GroupFeatureStoreSelectors } from 'src/app/root-store'
import { Observable } from 'rxjs'
import { FeedPublication } from 'src/app/core/models/publication/feed/feed-publication.model'
import { filter, skipWhile, take } from 'rxjs/operators'
import { NgxMasonryOptions } from 'ngx-masonry'
import { GroupModel } from 'src/app/core/models/group/group.model'

@Component({
  selector: 'app-group-story',
  templateUrl: './group-story.component.html',
  styleUrls: ['./group-story.component.scss']
})

export class GroupStoryComponent implements OnInit, OnDestroy {

  // publication
  publication$: Observable<FeedPublication[]>
  loading$: Observable<boolean>

  // masonry
  optionMasonry: NgxMasonryOptions = {
    resize: true,
    originLeft: false
  }

  // showPage
  counterPage = 1

  // groups
  groups$: Observable<GroupModel[]>

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {

    // to load the publications 
    this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication('1', 'GetGroupFeedPublication'))

    // to select the publications
    this.publication$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectAllItems),
      filter(value => value !== undefined),
    )

    // to show the loading logo
    this.loading$ = this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // to select all the groups list
    this.groups$ = this.store$.pipe(
      select(GroupFeatureStoreSelectors.selectAllGroupStoryItems),
      skipWhile(val => val.length == 0),
      filter(value => value !== undefined),
    )


  }

  onScroll(): void {

    // to load the next page
    this.counterPage += 1
    this.store$.pipe(
      select(FeedPublicationStoreSelectors.selectGroupSelected),
      skipWhile(val => val == null),
      filter(value => value !== undefined),
      take(1)
    ).subscribe(listSelected => {
      if (listSelected.length !== 0) {
        // load the publications for the group selected
        this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublicationByGroupID('1', listSelected))
      } else {
        // load the publications for all the group
        this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication(String(this.counterPage), 'GetGroupFeedPublication'))
      }
    })

  }

  ngOnDestroy(): void {
    // to reset all the publications
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)
  }

}
