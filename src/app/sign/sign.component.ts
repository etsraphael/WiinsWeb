import { Component, OnInit } from '@angular/core'
import { Router, RouterOutlet } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { SignAnimation } from 'src/assets/route-animation/sign-animation'
import { languageList } from '../core/data/language'
import { DeviceDetectorService } from 'ngx-device-detector'
import { Observable, Subscription } from 'rxjs'
import { UserModel } from '../core/models/baseUser/user.model'
import { Store, select } from '@ngrx/store'
import { RootStoreState, MyUserStoreSelectors, ProfileFeatureStoreSelectors } from '../root-store'
import { skipWhile, filter } from 'rxjs/operators'

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
  animations: [SignAnimation]
})

export class SignComponent implements OnInit {

  // translate
  listSelectLang: any[] = languageList
  selectedLang: string

  // store
  user$: Observable<UserModel>
  errorLog$: Observable<any>
  errorSubscription: Subscription
  loading$: Observable<boolean>
  profileLoading$: Observable<boolean>

  // early access fonctions
  displayingText = 2
  showEarlyAccess = false
  days: number
  hours: number
  minutes: number
  seconds: number

  constructor(
    public router: Router,
    private store$: Store<RootStoreState.State>,
    public translate: TranslateService,
    public deviceService: DeviceDetectorService
  ) { }

  ngOnInit() {

    // remove the information of the user
    localStorage.removeItem('user')
    localStorage.removeItem('profile')
    localStorage.removeItem('token')
    this.setLanguage()

    // check the user
    this.user$ = this.store$.pipe(
      select(MyUserStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // check the loading profile
    this.profileLoading$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectIsLoading),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // select the error message
    this.errorLog$ = this.store$.pipe(
      select(MyUserStoreSelectors.selectError),
      filter(value => value !== undefined),
      skipWhile(val => val == null)
    )

    // select the loading progress
    this.loading$ = this.store$.pipe(
      select(MyUserStoreSelectors.selectIsLoading),
      skipWhile(val => val == null),
      filter(value => value !== undefined)
    )

    this.startTimer()

  }

  startTimer() {
    let countDownDate = new Date('May 1, 2021 00:00:00').getTime()

    let x = setInterval(() => {

      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is finished, write some text
      if (distance <= 0) {
        this.showEarlyAccess = true
        clearInterval(x)
      }
    }, 1000)

  }

  setLanguage() {

    // found the default langage of the browser
    this.selectedLang == null
    if (navigator.language.toLowerCase().includes('-')) {
      return this.selectedLang = this.listSelectLang.filter(value => value.code == navigator.language.toLowerCase().split('-')[0])[0]
    }

    // set the default langage of the browser
    this.selectedLang = this.listSelectLang.filter(value => value.code == navigator.language.toLowerCase())[0]

    // set the english version if we don't have the dictionnay
    if (this.selectedLang !== null) return this.selectedLang = this.listSelectLang.filter(value => value.code == 'en')[0]

  }

  switchLanguage(langCode: string) {
    // change the language
    const choice = this.listSelectLang.filter(x => x.code == langCode)[0].value
    this.translate.use(choice)
  }

  prepareRoute(outlet: RouterOutlet) {
    // animation for the routing
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

  showAccess() {
    this.showEarlyAccess = true
  }

  changeSection(section: number): number {
    return this.displayingText = section
  }

}
