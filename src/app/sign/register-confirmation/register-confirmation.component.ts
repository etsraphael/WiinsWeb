import { Component, OnInit, OnDestroy } from "@angular/core";
import { AuthenticationService } from "../../core/services/authentication/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { TranslateService } from "@ngx-translate/core";
import { skipWhile, filter } from "rxjs/operators";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: "app-register-confirmation",
  templateUrl: "./register-confirmation.component.html",
  styleUrls: ["./register-confirmation.component.scss"],
})
export class RegisterConfirmationComponent implements OnInit, OnDestroy {
  idConfirm: string;

  // service
  response$: Observable<any>;
  responseSub: Subscription;
  profileReceived = "pending";

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    // get the id in the url
    this.idConfirm = this.route.snapshot.paramMap.get("id");

    // send validation
    this.response$ = this.authService.confirmationToken(this.idConfirm).pipe(
      skipWhile((val) => val === null),
      filter((profile) => !!profile)
    );

    // action after the validation
    this.responseSub = this.response$.subscribe(
      (data) => {
        this.profileReceived = "profileReceived";
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.tokenOnline);
      },
      () => {
        this.profileReceived = "profileFailed";
        this._snackBar.open(
          this.translate.instant("ERROR-MESSAGE.A-err-has-occurred"),
          null,
          {
            horizontalPosition: "center",
            verticalPosition: "bottom",
            duration: 5000,
          }
        );
      }
    );
  }

  navigateToSign() {
    // redirection to the login page
    this.router.navigate(["/sign"]);
  }

  logIn() {
    // redirection to the home page
    this.router.navigate(["/SpaceDiscover/#"]);
  }

  ngOnDestroy(): void {
    // unsubscribe all var
    this.responseSub.unsubscribe();
  }
}
