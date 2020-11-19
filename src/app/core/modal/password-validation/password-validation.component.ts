import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { MusicProject } from '../../models/publication/music/musicProject.model';
import { PaymentService } from '../../services/payment/payment.service';
import { MusicService } from '../../services/publications/music/music.service';

@Component({
  selector: 'app-password-validation',
  templateUrl: './password-validation.component.html',
  styleUrls: ['./password-validation.component.scss']
})

export class PasswordValidationComponent implements OnInit {

  // form
  sendForm: FormGroup

  constructor(
    public dialogRef: MatDialogRef<PasswordValidationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ValidationPassword,
    private formBuilder: FormBuilder,
    private paymentService: PaymentService,
    private musicService: MusicService,
    private _snackBar: MatSnackBar,
    private translate: TranslateService
  ) { }

  ngOnInit() {

    // password form
    this.sendForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    })

  }

  get f() {
    return this.sendForm.controls
  }

  closeModal() {
    // to close the modal
    this.dialogRef.close()
  }

  confirm() {

    if (this.sendForm.invalid) return null

    switch (this.data.type) {
      case 'cancelTransfertResquest': return this.cancelTransfertRequest()
      case 'updateImgMusicProject': return this.updateImgMusicProject()
      default: return null
    }

  }

  cancelTransfertRequest() {
    return this.paymentService.cancelTransfertRequest(this.data.id, this.sendForm .get('password').value)
      .pipe(take(1))
      .subscribe(
        () => {
          this._snackBar.open(
            this.translate.instant('VALID-MESSAGE.update-is-done'), null,
            { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
          )
          this.closeModal()
          setTimeout(() => location.reload(), 1000);
        },
        response => {
          switch (response) {
            case 'not_found': {
              this.closeModal()
              return this._snackBar.open(
                this.translate.instant('ERROR-MESSAGE.A-err-has-occurred'),
                this.translate.instant('CORE.close'),
                { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
              )
            }
            case 'password_invalid': {
              this.closeModal()
              return this._snackBar.open(
                this.translate.instant('ERROR-MESSAGE.Invalid-password'),
                null, { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
              )
            }
            default: return null
          }
        }
      )
  }

  updateImgMusicProject(){
    const project = new MusicProject(null, null, null, this.data.pictureUrl, null, this.data.id)



    console.log(project)

    return null

    return this.musicService.UpdateMusicProject(project, this.sendForm .get('password').value)
    .pipe(take(1))
    .subscribe(
      () => {
        this._snackBar.open(
          this.translate.instant('VALID-MESSAGE.update-is-done'), null,
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
        )
        this.closeModal()
        setTimeout(() => location.reload(), 1000);
      },
      response => {
        switch (response) {
          case 'not_found': {
            this.closeModal()
            return this._snackBar.open(
              this.translate.instant('ERROR-MESSAGE.A-err-has-occurred'),
              this.translate.instant('CORE.close'),
              { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
            )
          }
          case 'password_invalid': {
            this.closeModal()
            return this._snackBar.open(
              this.translate.instant('ERROR-MESSAGE.Invalid-password'),
              null, { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
            )
          }
          default: {
            this.closeModal()
            return this._snackBar.open(
              this.translate.instant('ERROR-MESSAGE.A-err-has-occurred'),
              null, { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
            )
          }
        }
      }
    )
  }

}

export interface ValidationPassword {
  type: string
  id: string
  pictureUrl: string
}