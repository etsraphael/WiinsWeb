import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-private-account',
  templateUrl: './private-account.component.html',
  styleUrls: ['./private-account.component.scss']
})
export class PrivateAccountComponent implements OnInit {
  @Input() pseudo: string;


  constructor() { }

  ngOnInit() {
  }

}
