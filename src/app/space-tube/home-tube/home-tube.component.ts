import { Component, OnInit } from '@angular/core';
import { TubeMenuModel } from 'src/app/core/models/tube/tubeMenu.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, TubeMenuStoreSelectors, TubeMenuStoreActions } from 'src/app/root-store';
import { filter, skipWhile } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(
    private store$: Store<RootStoreState.State>,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

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


  supportMessage(): void {
    const errorModal = this._snackBar.open(
      this.translate.instant('DONATION.Function-unavailable-at-the-moment-join-our-discord-to-help-with-creation'),
      this.translate.instant('CORE.Join'), {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      duration: 8000
    })

    errorModal.onAction().subscribe(() => window.open('https://discord.gg/jMyc443', '_blank'))
  }

}
