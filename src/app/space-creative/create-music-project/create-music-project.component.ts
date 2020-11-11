import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, skipWhile } from 'rxjs/operators';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { ProfileFeatureStoreSelectors, RootStoreState } from 'src/app/root-store';

@Component({
  selector: 'app-create-music-project',
  templateUrl: './create-music-project.component.html',
  styleUrls: ['./create-music-project.component.scss']
})

export class CreateMusicProjectComponent implements OnInit {

  // my profile
  myprofile$: Observable<ProfileModel>

  constructor(
    private store$: Store<RootStoreState.State>,
  ) { }

  ngOnInit(): void {

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val == null),
      filter(value => value !== undefined),
    )

  }

}