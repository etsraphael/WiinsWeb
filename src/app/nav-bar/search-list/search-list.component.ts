import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { RootStoreState, SearchProfileStoreSelectors, SearchPageStoreSelectors, ProfileFeatureStoreActions, PageFeatureStoreActions, FeedPublicationStoreActions } from 'src/app/root-store';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { PageModel } from 'src/app/core/models/page/page.model';
import { Observable, combineLatest } from 'rxjs';
import { skipWhile, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-list',
  templateUrl: './search-list.component.html',
  styleUrls: ['./search-list.component.scss']
})

export class SearchListComponent implements OnInit {

  // search bar
  resultsProfile$: Observable<ProfileModel[]>
  resultsPage$: Observable<PageModel[]>
  loading = false;

  // input - output
  @Input() getSearchStatus: boolean
  @Output() getSearchStatusChange = new EventEmitter<boolean>()

  constructor(
    private store$: Store<RootStoreState.State>,
    private router: Router
  ) { }

  ngOnInit() {

    // to selelect the profile found
    this.resultsProfile$ = combineLatest(
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSearchResults)),
      this.store$.pipe(select(SearchProfileStoreSelectors.selectSpot)),
    ).pipe(skipWhile(val => val[1] !== 'navbar'), map(x => x[0]))

    // to select the page found
    this.resultsPage$ = this.store$.pipe(
      select(SearchPageStoreSelectors.selectSearchResults),
    )

  }

  hideSearchBar() {
    // hide search bar after a click
    this.getSearchStatusChange.emit(true);
  }

  gotToProfile(profileID: string) {
    // redirection to the profil
    this.hideSearchBar()
    this.store$.dispatch(new ProfileFeatureStoreActions.resetProfile)
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)
    this.router.navigate(['/profile/' + profileID])
  }

  gotToPage(pageID: string) {
    // redirection to the page
    this.hideSearchBar()
    this.store$.dispatch(new PageFeatureStoreActions.ResetPage)
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)
    this.router.navigate(['/page/' + pageID])
  }

}
