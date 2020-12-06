import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  // router
  section: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getSection()
  }

  getSection(): void {
    if (this.router.url.split('/')[2] == this.activatedRoute.parent.snapshot.data['loadedUser'].profile) {
      this.section = 'myprofile'
    } else { this.section = 'profile' }
  }

}