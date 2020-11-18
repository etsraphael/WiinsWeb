import { animate, group, query, style, transition, trigger, useAnimation } from '@angular/animations'
import { jello, lightSpeedIn } from 'ngx-animate'

export const SignAnimation =[
  trigger('routeAnimations', [
    transition('SignUp => SignIn', [
      query(':enter, :leave',
        style({ position: 'fixed' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)', top: '27.5%' }),
          animate('0.6s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)', top: '25%' }),
          animate('0.6s ease-in-out',
            style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('SignIn => SignUp', [
      query(':enter, :leave',
        style({ position: 'fixed' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)', top: '25%' }),
          animate('0.6s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)', top: '27.5%' }),
          animate('0.6s ease-in-out',
            style({ transform: 'translateX(-100%)' }))
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
