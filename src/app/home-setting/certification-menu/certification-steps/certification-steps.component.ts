import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { ProfileModel } from 'src/app/core/models/baseUser/profile.model';
import { CertificationService } from 'src/app/core/services/certification/certification.service';
import { ProfileFeatureStoreSelectors, RootStoreState } from 'src/app/root-store';

@Component({
  selector: 'app-certification-steps',
  templateUrl: './certification-steps.component.html',
  styleUrls: ['./certification-steps.component.scss']
})

export class CertificationStepsComponent implements OnInit {

  // form
  checkedCond = false;

  // service
  requestPending = false;
  loading = false;

  // profile
  myprofile$: Observable<ProfileModel>;

  constructor(
    private store$: Store<RootStoreState.State>,
    private translate: TranslateService,
    private _snackBar: MatSnackBar,
    private certificationService: CertificationService
  ) { }

  ngOnInit() {

    // to select my profile
    this.myprofile$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectProfile),
      skipWhile(val => val === null),
      filter(profile => !!profile),
    );

    // to check is the request is already send
    this.certificationService.getCertificationProfile().pipe(take(1)).subscribe(
      () => { this.requestPending = true; },
      () => { this.requestPending = false; }
    );

  }

  confirm(): void | MatSnackBarRef<SimpleSnackBar> {

    this.myprofile$.pipe(take(1)).subscribe((profile: ProfileModel) => {

      // check if the user is verified
      if (profile.levelCertification !== 1) {
        return this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.You-hv-to-be-verified'), null,
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
        );
      }

      // check if the user have the community
      if (profile.communityTotal < 1000) {
        return this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.You-hv-to-get-t-community'), null,
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
        );
      }

      // send the request
      else {
      this.loading = true;
      this.certificationService.createCertificationProfile().pipe(take(1)).subscribe(
        action => {
          this.loading = false;
          this.requestPending = true;
        },
        error => {
          this.loading = false;
          this._snackBar.open(
            this.translate.instant('ERROR-MESSAGE.A-err-has-occurred'), null,
            { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
          );
        }
      );
      }
    });

  }

}