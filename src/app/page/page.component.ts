import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageFeatureStoreActions, RootStoreState, PageFeatureStoreSelectors, ViewStatStoreActions, ProfileFeatureStoreSelectors } from '../root-store';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PageModel } from '../core/models/page/page.model';
import { skipWhile, filter, take} from 'rxjs/operators';
import { ReportModalComponent } from '../core/modal/report-modal/report-modal.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})

export class PageComponent implements OnInit {

  // url
  pageId: string;

  // page
  page$: Observable<PageModel>;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {

    // get the id in url
    this.pageId = this.route.snapshot.paramMap.get('id')

    // to load the page
    this.store$.dispatch(new PageFeatureStoreActions.LoadPage(this.pageId))

    // redirection the page
    this.redirectionToMyPage()

    // to select the page
    this.page$ = this.store$.pipe(
      select(PageFeatureStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    )

    // stat view
    this.store$.dispatch(new ViewStatStoreActions.ViewPage(this.pageId))

  }

  follow() {
    // to follow the page
    this.store$.dispatch(new PageFeatureStoreActions.FollowPage(this.pageId));
  }

  unfollow() {
    // to unfollow the page
    this.store$.dispatch(new PageFeatureStoreActions.UnFollowPage(this.pageId));
  }

  redirectionToMyPage(){

    // to redirection to the admin space
    this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val == null),
      filter(profile => !!profile),
      take(1)
    ).subscribe(data => {
      if(data.adminsPage.map(x => x._id).includes(this.pageId)){
        this.router.navigate(['/mypage/' + this.pageId])
      }
    })
    
  }

  report(page: PageModel): MatDialogRef<ReportModalComponent> {
    console.log(page)
    // open the modal to report the publications
    return this.dialog.open(ReportModalComponent, {
      panelClass: ['col-md-10'],
      data: { page, type: 'page-report' }
    })
  }

}
