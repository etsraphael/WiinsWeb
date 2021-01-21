import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-music',
  templateUrl: './credit-music.component.html',
  styleUrls: ['./credit-music.component.scss']
})

export class CreditMusicComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreditMusicComponent>,
  ) { }

  ngOnInit(): void {
  }

}
