import { Component, Input } from '@angular/core';
import { ProfileModel } from '../../../core/models/baseUser/profile.model';

@Component({
  selector: 'app-profile-cover',
  templateUrl: './profile-cover.component.html',
  styleUrls: ['./profile-cover.component.scss']
})

export class ProfileCoverComponent {

  // default
  @Input() profile: ProfileModel;

  constructor() {}

}
