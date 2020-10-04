import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootStoreState, GroupFeatureStoreActions } from '../root-store';

@Component({
  selector: 'app-space-group',
  templateUrl: './space-group.component.html',
  styleUrls: ['./space-group.component.scss']
})

export class SpaceGroupComponent implements OnInit {

  constructor(
    private store$: Store<RootStoreState.State>,
  ) {}

  ngOnInit() {
    // to load all my group
    this.store$.dispatch(new GroupFeatureStoreActions.LoadMyGroups())
  }
}
