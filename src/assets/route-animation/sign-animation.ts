import { animate, group, query, style, transition, trigger, useAnimation } from '@angular/animations'
import { jello, lightSpeedIn } from 'ngx-animate'

export const SignAnimation =[
  trigger('routeAnimations', [
    transition('SignIn => OnBoarding', [
      query(':enter, :leave',
        style({ }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-200%)'}),
          animate('0.6s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.6s ease-in-out',
            style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('OnBoarding => SignIn', [
      query(':enter, :leave',
        style({ }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)'}),
          animate('0.6s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }),
          animate('0.6s ease-in-out',
            style({ transform: 'translateX(-200%)' }))
        ], { optional: true }),
      ])
    ])
  ]),
  trigger('stateLogin', [
    transition('default => error', useAnimation(jello,{ params: { timing: 1.2 }}))
  ]),
  trigger('donation', [
    transition('* => true', useAnimation(lightSpeedIn,{ params: { timing: 0.5 }}))
  ])
]
