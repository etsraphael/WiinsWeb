import { Component } from '@angular/core'

@Component({
  selector: 'app-container-t-o-u',
  templateUrl: './container-t-o-u.component.html',
  styleUrls: ['./container-t-o-u.component.scss']
})

export class ContainerTOUComponent {

  constructor() { }

  scroll(el: HTMLElement) {
    // focus on a section
    el.scrollIntoView({behavior: 'smooth'});
  }

}
