import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    private formBuilder: FormBuilder
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
    alert('bla')

    if (this.sendForm.invalid) return null

  }

}


export interface ValidationPassword {
  type: string
  id: string
}

