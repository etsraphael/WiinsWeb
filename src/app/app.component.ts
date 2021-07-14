import { Component, OnInit } from '@angular/core'
import {
  Event, Router, NavigationEnd, NavigationStart, NavigationCancel,
  NavigationError, RouterOutlet
} from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { Observable } from 'rxjs'
import { UserModel } from './core/models/baseUser/user.model'
import { Store, select } from '@ngrx/store'
import { RootStoreState, MyUserStoreSelectors } from './root-store'
import { SpaceAnimation } from 'src/assets/route-animation/space-animation'
import { StatePlarformService } from './core/statePlarform/state-plarform.service'
import { skipWhile, filter, take } from 'rxjs/operators'
import { languageList } from './core/data/language'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [SpaceAnimation]
})

export class AppComponent implements OnInit {

  // my user
  user$: Observable<UserModel>

  // router
  loading = true

  // language
  listSelectLang: any[] = languageList

  constructor(
    private _router: Router,
    public translate: TranslateService,
    private store$: Store<RootStoreState.State>,
    private plateformState: StatePlarformService
  ) {
    this._router.events.subscribe((routerEvent: Event) => {

      if(routerEvent instanceof NavigationStart) {
        this.loading = true;
      }

      if(routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationCancel || routerEvent instanceof NavigationError) {
        this.loading = true;
      }
    });
   }

  ngOnInit(): void {

    // to select my user
    this.user$ = this.store$.pipe(
      select(MyUserStoreSelectors.select),
      skipWhile(val => val == null),
      filter(val => !!val)
    )

    // setting the base
    this.setTheState()
    this.setLangage()

  }

  prepareRoute(outlet: RouterOutlet) {
    // router animations
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

  setLangage() {

    // to select the language config if the user is connected
    this.user$.pipe(take(1)).subscribe(action => this.translate.setDefaultLang(action.config.language))

    let lg = null

    // to set the language by default
    if (navigator.language.toLowerCase().includes('-')) {
      lg = this.listSelectLang.filter(value => value.code == navigator.language.toLowerCase().split('-')[0])[0].value
      if (lg !== null) return this.translate.setDefaultLang(lg)
    }
    lg = this.listSelectLang.filter(value => value.code == navigator.language.toLowerCase())[0].value
    if (lg !== null) return this.translate.setDefaultLang(lg)
    else return this.translate.setDefaultLang('en')

  }

  setTheState() {
    // to set the state for the notifications
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.plateformState.changeState({ page_actif: false })
      else this.plateformState.changeState({ page_actif: true })
    }, false)
  }
  
}
