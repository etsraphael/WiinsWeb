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

  constructor(
    public dialogRef: MatDialogRef<CreditMusicComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { something: any }
  ) { }

  ngOnInit(): void {
  }

  interpretedBy(){
    this.interpreter = null
  }

  ngOnDestroy(): void {
    this.onAdd.unsubscribe()
  }

}
