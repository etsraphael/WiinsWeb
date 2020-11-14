import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { CertificationService } from 'src/app/core/services/certification/certification.service';

@Component({
  selector: 'app-veritification-steps',
  templateUrl: './veritification-steps.component.html',
  styleUrls: ['./veritification-steps.component.scss']
})

export class VeritificationStepsComponent implements OnInit {

  // file
  fileIdname: string
  pictureTakeName: string

  // form
  checkedCond = false

  // service 
  requestPending:boolean = false

  constructor(
    private translate: TranslateService,
    private _snackBar: MatSnackBar,
    private certificationService: CertificationService
  ) { }

  ngOnInit() {

    // to know if the request is already sent
    this.certificationService.getVerificationProfile().pipe(take(1)).subscribe(
      () => { this.requestPending = true },
      () => { this.requestPending = false }
    )

  }

  saveIdFile(event: any){
    if(event.target.files.length == 0)return null
    this.fileIdname = event.target.files[0].name
  }

  savepictureTakeFile(event: any){
    if(event.target.files.length == 0)return null
    this.pictureTakeName = event.target.files[0].name
  }

  changeCheckBtn(event: MatCheckboxChange){
    this.checkedCond = event.checked
  }
  
  confirm(): void | MatSnackBarRef<SimpleSnackBar>{
    return this._snackBar.open(
      this.translate.instant('ERROR-MESSAGE.Els-are-incorrects'), null,
      { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
    )
  }
}

export interface VerificationForm {
  identityFile: string
  pictureTakeFile: string
}