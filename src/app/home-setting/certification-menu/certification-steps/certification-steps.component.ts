import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-certification-steps',
  templateUrl: './certification-steps.component.html',
  styleUrls: ['./certification-steps.component.scss']
})

export class CertificationStepsComponent implements OnInit {

  // form
  checkedCond = false

  // service 
  requestPending: boolean = false
  loading: boolean = false

  constructor() { }

  ngOnInit() {
  }

  confirm(){
    alert('progressing..')
  }

}
