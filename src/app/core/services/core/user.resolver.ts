import { Injectable } from '@angular/core'
import { Resolve, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { filter, skipWhile, take } from 'rxjs/operators'
import { UserModel } from '../../models/baseUser/user.model'
import { Store, select } from '@ngrx/store'
import { RootStoreState, MyUserStoreSelectors, MyUserStoreActions } from 'src/app/root-store'
import { StatePlarformService } from '../../statePlarform/state-plarform.service'

@Injectable({
  providedIn: 'root'
})

export class UserResolver implements Resolve<UserModel>  {

  // user
  user$: Observable<UserModel>;
  error$: Observable<String>

  constructor(
    private store$: Store<RootStoreState.State>,
    private statePlateform: StatePlarformService,
    private router : Router
  ) { }


  resolve(): Observable<UserModel> | any {

    if(localStorage.getItem('token') == null) return this.router.navigate(['/sign/in'])

    // to load user
    this.store$.dispatch(new MyUserStoreActions.LoadUserWithToken(localStorage.getItem('token')));
    this.store$.dispatch(new MyUserStoreActions.WebSocketConnect(localStorage.getItem('token')))
    this.statePlateform.initializeChange()

    // to select the user
    this.user$ = this.store$.pipe(
      select(MyUserStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    // to select the error user
    this.error$ = this.store$.pipe(
      select(MyUserStoreSelectors.selectError),
      skipWhile(val => val === null),
      filter(value => value !== undefined),
    )

    if(this.user$.pipe(take(1)) !== null ) return this.user$.pipe(take(1))
    else return this.router.navigate(['/sign/in'])

  }


}
