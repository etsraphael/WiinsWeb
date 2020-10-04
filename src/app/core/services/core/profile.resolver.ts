import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ProfileModel } from '../../models/baseUser/profile.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ProfileFeatureStoreActions, RootStoreState } from 'src/app/root-store';

@Injectable({
  providedIn: 'root'
})

export class ProfileResolver implements Resolve<ProfileModel>  {
  constructor(private store$: Store<RootStoreState.State>) { }

  resolve(): Observable<ProfileModel> {
    this.store$.dispatch(new ProfileFeatureStoreActions.GetProfile());
    return null;
  }
}
