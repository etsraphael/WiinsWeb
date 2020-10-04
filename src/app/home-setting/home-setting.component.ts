import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserModel } from '../core/models/baseUser/user.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home-setting',
  templateUrl: './home-setting.component.html',
  styleUrls: ['./home-setting.component.scss']
})
export class HomeSettingComponent implements OnInit {

  // get the user
  user: UserModel;

  constructor(
    private activatedRoute: ActivatedRoute,
    public translate: TranslateService,
    public router: Router) {
      this.user = activatedRoute.snapshot.data['loadedUser'];
    }

  ngOnInit() {
  }


}
