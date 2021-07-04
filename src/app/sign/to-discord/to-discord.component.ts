import { Component, OnInit } from '@angular/core';
import { SignAnimation } from 'src/assets/route-animation/sign-animation';

@Component({
  selector: 'app-to-discord',
  templateUrl: './to-discord.component.html',
  styleUrls: ['./to-discord.component.scss'],
  animations: [SignAnimation]
})
export class ToDiscordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
