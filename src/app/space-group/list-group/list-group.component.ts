import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { GroupModel } from 'src/app/core/models/group/group.model'
import { Store, select } from '@ngrx/store'
import { RootStoreState, GroupFeatureStoreSelectors, ProfileFeatureStoreSelectors, FeedPublicationStoreActions } from 'src/app/root-store'
import { filter, skipWhile } from 'rxjs/operators'
import { MatDialog } from '@angular/material'
import { ProfileListComponent } from 'src/app/core/modal/profile-list/profile-list.component'
import { ValidationsComponent } from 'src/app/core/modal/validations/validations.component'

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})

export class ListGroupComponent implements OnInit {

  // groups
  groups$: Observable<GroupModel[]>
  selectedGroup: string[] = []
  myadminsgroup$: Observable<string[]>

  // filter
  filterGroup: string[] = []

  constructor(
    private store$: Store<RootStoreState.State>,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    // to select all the groups list
    this.groups$ = this.store$.pipe(
      select(GroupFeatureStoreSelectors.selectAllGroupStoryItems),
      skipWhile(val => val.length == 0),
      filter(value => value !== undefined),
    )

    // to select my admin group
    this.myadminsgroup$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectMyAdminGroup),
      skipWhile(val => val.length == 0),
      filter(value => value !== undefined),
    )

  }

  selectGroup(id: string) {

    // unselect the group 
    if (this.selectedGroup.includes(id)) this.selectedGroup = this.selectedGroup.filter(x => x !== id)
    // select the group 
    else this.selectedGroup.push(id)

    // reset all the publications
    this.store$.dispatch(new FeedPublicationStoreActions.ResetFeed)

    // load the publications for the group selected
    if (this.selectedGroup.length == 0) this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublication(String('1'), 'GetGroupFeedPublication'))
    // load all the publications for each groups
    else this.store$.dispatch(new FeedPublicationStoreActions.LoadFeedPublicationByGroupID('1', this.selectedGroup))

  }

  selectedStyle(id: string): boolean {
    // to get the selected style
    if (this.selectedGroup && this.selectedGroup.includes(id)) return true
    else return false
  }

  manageGroup(id: string, myAdminGroup: string[]): boolean {
    // to show the btn to manage the group
    if (myAdminGroup.includes(id)) return true
    else return false
  }

  openListModal(group: GroupModel) {
    // to see all the members
    this.dialog.open(ProfileListComponent, {
      panelClass: 'col-3',
      data: { categorie: 'member-group', id: group._id, total_profile: group.members_total }
    })
  }

  openModalLeaveGroup(id: string) {
    // to open the modal to leave the group
    this.dialog.open(ValidationsComponent, {
      panelClass: ['col-md-4'],
      data: { id, type: 'leave-group'  }
    })
  }

}
