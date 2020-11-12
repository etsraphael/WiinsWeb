import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { ProfileFeatureStoreSelectors, RootStoreState } from 'src/app/root-store';

@Component({
  selector: 'app-certification-menu',
  templateUrl: './certification-menu.component.html',
  styleUrls: ['./certification-menu.component.scss']
})

export class CertificationMenuComponent implements OnInit {

  // profile 
  myprofile$: Observable<ProfileModel>

  constructor(
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val === null),
      filter(profile => !!profile),
    )
    
  }

}
