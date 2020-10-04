import { Injectable } from '@angular/core';
import { statePlateform } from '../models/state/statePlateform.model';

@Injectable({
  providedIn: 'root'
})

export class StatePlarformService {

  statePlateform: statePlateform = new statePlateform(null, null, null, null, null)

  constructor() { }

  changeState(modification: Object){
    this.statePlateform = Object.assign(this.statePlateform, modification)
  }

  getState(){
    return this.statePlateform
  }

  initializeChange(){
    this.statePlateform = new statePlateform(null, null, null, null, null)
  }

}
