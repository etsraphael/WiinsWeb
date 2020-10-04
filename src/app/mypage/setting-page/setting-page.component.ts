import { Component, OnInit, OnDestroy } from '@angular/core'
import { Store, select } from '@ngrx/store'
import { RootStoreState, PageFeatureStoreActions, PageFeatureStoreSelectors } from 'src/app/root-store'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { PageModel } from 'src/app/core/models/page/page.model'
import { skipWhile, filter } from 'rxjs/operators'
import { MatSnackBar } from '@angular/material'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-setting-page',
  templateUrl: './setting-page.component.html',
  styleUrls: ['./setting-page.component.scss']
})

export class SettingPageComponent implements OnInit, OnDestroy {

  // design ngIf
  blockoption = false;
  deleteoption = false;

  // pageId
  pageId: string;

  // input
  passwordToSend: string;
  passwordDelete: string;

  // page
  page$: Observable<PageModel>;
  page: PageModel;

  // response
  respond$: Observable<string>;
  respondSubscription: Subscription;
  error$: Observable<string>;
  errorSub: Subscription;

  constructor(
    private store$: Store<RootStoreState.State>,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    // to get the id in the url
    this.pageId = this.route.parent.snapshot.paramMap.get('id');

    // to select the page 
    this.page$ = this.store$.pipe(
      select(PageFeatureStoreSelectors.select),
      skipWhile(val => val === null),
      filter(value => value !== undefined)
    );

    // to get the response after update
    this.respond$ = this.store$.pipe(
      select(PageFeatureStoreSelectors.selectMessage),
      skipWhile(val => val === null),
      filter(value => !!value)
    )

    // to select an error about the page
    this.error$ = this.store$.pipe(
      select(PageFeatureStoreSelectors.selectError),
      skipWhile(val => val === null),
      filter(value => !!value)
    )

    // to alert after the response 
    this.errorSub = this.error$.subscribe(response => this.showError(response))

  }

  changeVisibility(categorie: string) {

    // to change the visibility
    if (this.passwordToSend !== null) {
      this.store$.dispatch(new PageFeatureStoreActions.ChangeVisibility(this.passwordToSend, this.pageId, categorie));

      this.respond$.subscribe(data => {
        switch (data) {
          case 'email_or_password_invalid':
            this._snackBar.open(
              this.translate.instant('ERROR-MESSAGE.Invalid-password'),
              null, { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 5000 }
            )
            break;
          case 'success':
            this._snackBar.open(
              this.translate.instant('VALID-MESSAGE.update-is-done'),
              null, { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 5000 }
            )
            this.blockoption = false;
            break;
          default: break;
        }
      });
    }

    // the password is empty
    else {
      this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Please-type-yr-password'),
        this.translate.instant('CORE.close'),
        { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 5000 }
      )
    }

    // reset the password form
    this.passwordToSend = null;

  }

  deletePage() {
    // to delete the page
    if (!this.passwordDelete) return this.showError('email_or_password_invalid')
    this.store$.dispatch(new PageFeatureStoreActions.DeletePage(this.passwordDelete, this.pageId))
  }


  showError(error: string) {
    // to alert after the response
    switch (error) {
      case 'email_or_password_invalid': return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.Invalid-password'),
        this.translate.instant('CORE.close'),
        { horizontalPosition: 'left', verticalPosition: 'bottom', duration: 5000 }
      )
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    // unsubscribe all var
    if (this.errorSub) this.errorSub.unsubscribe()
  }

}