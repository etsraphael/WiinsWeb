import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-modal-t-o-u',
  templateUrl: './modal-t-o-u.component.html',
  styleUrls: ['./modal-t-o-u.component.scss']
})

export class ModalTOUComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalTOUComponent>,
  ) { }

  close(){
    // to close the modal
    this.dialogRef.close()
  }

}
