import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnDestroy {

  // router
  section: string
  subRouter: Subscription

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { this.routerListener() }


  getSection(): void {
    if (this.router.url.split('/')[2] == this.activatedRoute.parent.snapshot.data['loadedUser'].profile) {
      this.section = 'myprofile'
    } else { this.section = 'profile' }
  }

  routerListener(): Subscription {
    return this.subRouter = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => this.getSection())
  }

  ngOnDestroy(): void {
    this.subRouter.unsubscribe()
  }

}