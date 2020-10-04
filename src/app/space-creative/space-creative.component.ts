import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-space-creative',
  templateUrl: './space-creative.component.html',
  styleUrls: ['./space-creative.component.scss']
})

export class SpaceCreativeComponent {

  // default
  btnList = [
    { name: 'CREATION.Create-group', link: 'group', icon: 'fa-users', gradientColor: 'btn-group' },
    { name: 'CREATION.Create-page', link: 'page', icon: 'fa-leaf', gradientColor: 'btn-page' },
    { name: 'CREATION.Create-music-PM', link: 'music', icon: 'fa-music', gradientColor: 'btn-create-music' },
    { name: 'CREATION.Create-music-P', link: 'playlistMusic', icon: 'fa-headphones', gradientColor: 'btn-playlist-music' },
    { name: 'CREATION.Create-video-PT', link: 'tube', icon: 'fa-video-camera', gradientColor: 'btn-create-tube' },
  ]

  constructor(public router: Router) { }

}
