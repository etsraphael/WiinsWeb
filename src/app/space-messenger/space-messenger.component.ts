import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { StatePlarformService } from '../core/statePlarform/state-plarform.service';

@Component({
  selector: 'app-space-messenger',
  templateUrl: './space-messenger.component.html',
  styleUrls: ['./space-messenger.component.scss']
})

export class SpaceMessengerComponent implements OnInit, OnDestroy {

  constructor(
    public router: Router,
    private stateP: StatePlarformService,
  ) { }

  ngOnInit() {
    // set the state for notification
    this.stateP.changeState({ main_roomActif: 'nothing' })
  }

  ngOnDestroy(): void {
    // set the state for notification
    this.stateP.changeState({ main_roomActif: null })
  }

}
