import { Component } from '@angular/core';
import { CoreService } from 'src/app/core/services/core/core.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})

export class OthersComponent {

  // animation
  blockoption = false
  deleteoption = false

  // password
  deletingPassword: String

  constructor(
    private CoreService: CoreService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService,
    private router: Router
  ) { }

  deleteMyAccount() {

    // check the password
    if (this.deletingPassword == null) return this._snackBar.open(
      this.translate.instant('ERROR-MESSAGE.Els-are-incorrects'),
      this.translate.instant('CORE.close'),
      { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
    )


    // send the request
    this.CoreService.DeleteUser(this.deletingPassword).subscribe(
      () => {  

        // redirection & alert
        this._snackBar.open(
          this.translate.instant('VALID-MESSAGE.Yr-account-has-been-deleted'), null,
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
        )

        return this.router.navigate(['sign/in'])
    },
      error => {
        // if the user have some page 
        if (error == 'manage_group_or_page_before') return this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.y-h-to-delete-yr-page-or-group-before'), null,
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
        )
      }
    )

  }

}