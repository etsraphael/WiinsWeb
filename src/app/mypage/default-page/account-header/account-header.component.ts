import { Component, OnInit } from '@angular/core';
import { skipWhile, filter } from 'rxjs/operators';
import { PageModel } from 'src/app/core/models/page/page.model';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { RootStoreState, PageFeatureStoreSelectors } from 'src/app/root-store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss']
})

export class AccountHeaderComponent implements OnInit {

  // page
  page$: Observable<PageModel>
  pageId: string

  // link
  linkTeam: string;
  linkHome: string;
  linkSetting: string;

  // my role
  myrole: string;

  constructor(
    private route: ActivatedRoute,
    private store$: Store<RootStoreState.State>,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    // to select the page
    this.page$ = this.store$.pipe(
      select(PageFeatureStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    )

    // to initialize the link
    this.myrole = this.activatedRoute.parent.snapshot.data['loadedPage'];
    this.pageId = this.route.parent.snapshot.paramMap.get('id');
    this.linkHome = '/mypage/' + this.pageId + '/story';
    this.linkTeam = '/mypage/' + this.pageId + '/team';
    this.linkSetting = '/mypage/' + this.pageId + '/setting';
    
  }

}
