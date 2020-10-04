import { transition, trigger, query, style, animate, group } from '@angular/animations'

export const slideInProfile =
  trigger('routeAnimations', [
    transition('Story => *, Music => Tube', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '90%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)', width: '78.5%' }),
          animate('1s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(-30%)' }),
          animate('1s ease-in-out',
            style({ transform: 'translateX(-150%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('Music => Story, Tube => *', [
      query(':enter, :leave',
        style({ position: 'fixed' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)', width: '80%' }),
          animate('1s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(30%)' }),
          animate('1s ease-in-out',
            style({ transform: 'translateX(150%)' }))
        ], { optional: true }),
      ])
    ]),
  ]);
