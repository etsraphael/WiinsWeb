import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CoreService } from 'src/app/core/services/core/core.service';
import { languageList } from 'src/app/core/data/language';
import { take, skipWhile, filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { UserModel } from 'src/app/core/models/baseUser/user.model';
import { Store, select } from '@ngrx/store';
import { RootStoreState, MyUserStoreSelectors } from 'src/app/root-store';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})

export class LanguageComponent implements OnInit {

  // my user
  user$: Observable<UserModel>

  // select lang
  selectedLanguage: string;
  languageList: any[] = languageList

  constructor(
    private translate: TranslateService,
    private http: CoreService,
    private _snackBar: MatSnackBar,
    private store$: Store<RootStoreState.State>
  ) { }

  ngOnInit() {

    // to select my user
    this.user$ = this.store$.pipe(
      select(MyUserStoreSelectors.select),
      skipWhile(val => val == null),
      filter(val => !!val)
    )

    // to extract the language
    this.user$.pipe(take(1)).subscribe(action => this.selectedLanguage = action.config.language)

  }

  switchLanguage(codelanguage: MatSelectChange): void {
    // to swith the language
    this.selectedLanguage = codelanguage.value;
    this.translate.use(this.selectedLanguage)
  }

  save(): void {
    // to save and update the language
    const sub: Subscription = this.http.settingLangage(this.selectedLanguage).subscribe(() => {
      this.translate.use(this.selectedLanguage)
      this._snackBar.open(
        this.translate.instant('VALID-MESSAGE.update-is-done'), null,
        { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
      )
      sub.unsubscribe()
    })
  }

}
