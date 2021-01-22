import { Component, EventEmitter, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-music',
  templateUrl: './credit-music.component.html',
  styleUrls: ['./credit-music.component.scss']
})

export class CreditMusicComponent implements OnInit, OnDestroy {

  // parent
  onAdd = new EventEmitter();

  // input
  interpreter: string
  writter: string
  producer: string

  // arrays
  interpreters: string[]
  writters: string[]
  producers: string[]

  constructor(
    public dialogRef: MatDialogRef<CreditMusicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { musicCredit: MusicCredit }
  ) { }

  ngOnInit(): void {
  }

  addNewRole(role: string) {

    // add in the role
    const newRole: CreditName = { name: this.interpreter, role }
    this.onAdd.emit(newRole)

    switch (role) {
      case 'interpreter': this.interpreter = null
      case 'writter': this.writter = null
      case 'interpreter': this.producer = null
    }

  }

  ngOnDestroy(): void {
    this.onAdd.unsubscribe()
  }

}


export interface CreditName {
  name: string
  role: string
}

export interface MusicCredit {
  interpreters: string[]
  writters: string[]
  producers: string[]
}