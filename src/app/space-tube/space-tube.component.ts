import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TubeAnimation } from 'src/assets/route-animation/tube-animation'

@Component({
  selector: 'app-space-tube',
  templateUrl: './space-tube.component.html',
  styleUrls: ['./space-tube.component.scss'],
  animations: [TubeAnimation]
})

export class SpaceTubeComponent {

  constructor() {
  }

  prepareRoute(outlet: RouterOutlet) {
    // routing animation
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }

}
