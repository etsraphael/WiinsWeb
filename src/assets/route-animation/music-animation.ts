import { transition, trigger, useAnimation } from '@angular/animations'
import { zoomIn } from 'ngx-animate'

export const MusicAnimation = [
  trigger('HeaderPlaylist', [
    transition('* => *', useAnimation(zoomIn,{ params: { timing: 0.7 }})),
  ])
]


