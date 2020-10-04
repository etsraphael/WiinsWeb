import { Component, Input } from '@angular/core';
import { ProfileModel } from '../../../core/models/baseUser/profile.model';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})

export class ProfilePictureComponent {

  // default
  @Input() profile: ProfileModel

  constructor() { }

}
