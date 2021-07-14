import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Router, RouterOutlet } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { SignAnimation } from "src/assets/route-animation/sign-animation";
import { languageList } from "../core/data/language";
import { DeviceDetectorService } from "ngx-device-detector";
import { Observable, Subscription } from "rxjs";
import { UserModel } from "../core/models/baseUser/user.model";
import { Store, select } from "@ngrx/store";
import { ModalTOUComponent } from 'src/app/core/modal/modal-t-o-u/modal-t-o-u.component';
import { MatDialog } from '@angular/material/dialog';
import {
  RootStoreState,
  MyUserStoreSelectors,
  ProfileFeatureStoreSelectors,
} from "../root-store";
import { skipWhile, filter } from "rxjs/operators";

@Component({
  selector: "app-sign",
  templateUrl: "./sign.component.html",
  styleUrls: ["./sign.component.scss"],
  animations: [SignAnimation],
})
export class SignComponent implements OnInit, AfterViewChecked {
  // translate
  listSelectLang: any[] = languageList;
  selectedLang: string;

  // store
  user$: Observable<UserModel>;
  errorLog$: Observable<any>;
  errorSubscription: Subscription;
  loading$: Observable<boolean>;
  profileLoading$: Observable<boolean>;

  constructor(
    public router: Router,
    private store$: Store<RootStoreState.State>,
    public translate: TranslateService,
    public deviceService: DeviceDetectorService,
    private changeRef: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngAfterViewChecked(): void {
    this.changeRef.detectChanges();
  }

  ngOnInit() {
    // remove the information of the user
    localStorage.removeItem("user");
    localStorage.removeItem("profile");
    localStorage.removeItem("token");
    this.setLanguage();

    // check the user
    this.user$ = this.store$.pipe(
      select(MyUserStoreSelectors.select),
      skipWhile((val) => val === null),
      filter((value) => value !== undefined)
    );

    // check the loading profile
    this.profileLoading$ = this.store$.pipe(
      select(ProfileFeatureStoreSelectors.selectIsLoading),
      skipWhile((val) => val === null),
      filter((value) => value !== undefined)
    );

    // select the error message
    this.errorLog$ = this.store$.pipe(
      select(MyUserStoreSelectors.selectError),
      filter((value) => value !== undefined),
      skipWhile((val) => val == null)
    );

    // select the loading progress
    this.loading$ = this.store$.pipe(
      select(MyUserStoreSelectors.selectIsLoading),
      skipWhile((val) => val == null),
      filter((value) => value !== undefined)
    );
  }

  setLanguage() {
    // found the default langage of the browser
    this.selectedLang == null;
    if (navigator.language.toLowerCase().includes("-")) {
      return (this.selectedLang = this.listSelectLang.filter(
        (value) => value.code == navigator.language.toLowerCase().split("-")[0]
      )[0]);
    }

    // set the default langage of the browser
    this.selectedLang = this.listSelectLang.filter(
      (value) => value.code == navigator.language.toLowerCase()
    )[0];

    // set the english version if we don't have the dictionnay
    if (this.selectedLang !== null)
      return (this.selectedLang = this.listSelectLang.filter(
        (value) => value.code == "en"
      )[0]);
  }

  switchLanguage(langCode: string) {
    // change the language
    const choice = this.listSelectLang.filter((x) => x.code == langCode)[0]
      .value;
    this.translate.use(choice);
  }

  prepareRoute(outlet: RouterOutlet) {
    // animation for the routing
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData["animation"]
    );
  }

  openTOU() {
    // open the modal for the term of use
    this.dialog.open(ModalTOUComponent, { panelClass: ['col-md-10', 'col-sm-12', 'col-12'] })
  }
}
