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

  // confirmation
  musicCredit: MusicCredit = null

  constructor(
    public dialogRef: MatDialogRef<CreditMusicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { name: string, index: number }
  ) { }

  ngOnInit(): void {
    this.musicCredit = {
      index: this.data.index,
      interpreters: [],
      writters: [],
      producers: []
    }
  }

  addNewRole(role: string) {

    switch (role) {
      case 'interpreter': {
        this.musicCredit.interpreters.push(this.interpreter)
        this.interpreter = null
        break;
      }
      case 'writter': {
        this.musicCredit.writters.push(this.writter)
        this.writter = null
        break;
      }
      case 'producer': {
        this.musicCredit.producers.push(this.producer)
        this.producer = null
        break;
      }
    }

  }

  removeRole(type: string, i: number){
    switch (type) {
      case 'interpreter': {
        this.musicCredit.interpreters.splice(i, 1)
        this.interpreter = null
        break;
      }
      case 'writter': {
        this.musicCredit.writters.splice(i, 1)
        this.writter = null
        break;
      }
      case 'producer': {
        this.musicCredit.producers.splice(i, 1)
        this.producer = null
        break;
      }
    }
  }



  confirm() {
    this.onAdd.emit(this.musicCredit)
    this.dialogRef.close()
  }

  ngOnDestroy(): void {
    this.onAdd.unsubscribe()
  }

}





export interface CreditName {
  index: number
  name: string
  role: string
}

export interface MusicCredit {
  index: number
  interpreters: string[] | any[]
  writters: string[]
  producers: string[]
}