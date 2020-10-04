import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { UserModel } from '../core/models/baseUser/user.model'

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss']
})

export class MypageComponent implements OnInit {

  // user
  user: UserModel;
  myrole: string;

  constructor(
    private activatedRoute: ActivatedRoute
  ) {
    this.user = activatedRoute.parent.snapshot.data['loadedUser'];
  }

  ngOnInit() {
    // get my role
    this.myrole = this.activatedRoute.snapshot.data['loadedPage'];
  }

}
