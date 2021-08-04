import { transition, trigger, useAnimation, query, group, style, animate } from '@angular/animations'

export const TubeAnimation = [
  trigger('Tube', [
    // transition('Home => Watching', useAnimation(zoomIn,{ params: { timing: 0.7 }})),
    transition('Watching => Home', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%', height: '100%'}),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'scale(0)', width: '84.5%' }),
          animate('0.5s ease-in-out',
            style({ transform: 'scale(1)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'scale(1)' }),
          animate('0.5s ease-in-out',
            style({ transform: 'scale(0)' }))
        ], { optional: true }),
      ])
    ])
  ])
]


