import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-content-id',
  templateUrl: './content-id.component.html',
  styleUrls: ['./content-id.component.scss'],
})

export class ContentIdComponent {

  constructor(
    public dialogRef: MatDialogRef<ContentIdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) { }

}
