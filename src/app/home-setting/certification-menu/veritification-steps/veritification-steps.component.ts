import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-veritification-steps',
  templateUrl: './veritification-steps.component.html',
  styleUrls: ['./veritification-steps.component.scss']
})

export class VeritificationStepsComponent implements OnInit {

  fileIdname: string

  constructor() { }

  ngOnInit() {
  }

  saveIdFile(event: any){

    if(event.target.files.length == 0){
      return null
    }
    this.fileIdname = event.target.files[0].name
  }


}
