import { Component, OnInit } from '@angular/core';
import { TubeMenuModel } from 'src/app/core/models/tube/tubeMenu.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, TubeMenuStoreSelectors, TubeMenuStoreActions } from 'src/app/root-store';
import { filter, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'app-home-tube',
  templateUrl: './home-tube.component.html',
  styleUrls: ['./home-tube.component.scss']
})

export class HomeTubeComponent implements OnInit {

  // menu
  tubeMenu$: Observable<TubeMenuModel>
  error$: Observable<string>
  loading$: Observable<boolean>

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {

    // to load the menu
    this.store$.dispatch(new TubeMenuStoreActions.LoadMenuFeed)

    // to select the menu
    this.tubeMenu$ = this.store$.pipe(
      select(TubeMenuStoreSelectors.select),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // to show the loading animation
    this.loading$ = this.store$.pipe(
      select(TubeMenuStoreSelectors.selectIsLoading),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // to select the publications error
    this.error$ = this.store$.pipe(
      select(TubeMenuStoreSelectors.selectError),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

  }

}
