import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';

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

  constructor() { }

  ngOnInit() {
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



}
