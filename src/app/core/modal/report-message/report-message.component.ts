import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-report-message',
  templateUrl: './report-message.component.html',
  styleUrls: ['./report-message.component.scss']
})

export class ReportMessageComponent {

  constructor(
    public dialogRef: MatDialogRef<ReportMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ReportModal
  ) { }

}


interface ReportModal {
  level: Number,
  categorie: Number
}
