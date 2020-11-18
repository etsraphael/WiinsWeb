import { Component, OnInit, OnDestroy } from '@angular/core'
import { RouterOutlet, Router } from '@angular/router'
import { SpaceAnimation } from 'src/assets/route-animation/space-animation'
import { Observable, Subscription } from 'rxjs'
import { UserModel } from '../core/models/baseUser/user.model'
import { RootStoreState, MyUserStoreSelectors } from '../root-store'
import { Store, select } from '@ngrx/store'
import { skipWhile, filter } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material/snack-bar'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [SpaceAnimation]
})

export class HomeComponent implements OnInit, OnDestroy {

  // user
  user$: Observable<UserModel>
  userSub: Subscription

  constructor(
    private store$: Store<RootStoreState.State>,
    public router: Router,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    // to get the user
    this.user$ = this.store$.pipe(
      select(MyUserStoreSelectors.select),
      skipWhile((val: UserModel) => val === null),
      filter((value: UserModel) => value !== undefined),
    )

    // check if the user is active
    this.userSub = this.user$.subscribe((action: UserModel) => {
      if (!action.active) {
        this.router.navigate(['/setting/ledger'])
        this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.Account-temporarily-disabled'), null,
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
        )
      }
    })

  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe()
  }

  // transition for the routing
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

}
