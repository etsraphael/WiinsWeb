import { transition, trigger, query, style, animate, group, useAnimation, state } from '@angular/animations'

export const SpaceAnimation =[
  trigger('mainSpace', [
    transition('Sign => Home', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%', height: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)' }),
          animate('1.2s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }), 
          animate('1.2s ease-in-out',
            style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('Home => Sign', [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%', height: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)' }),
          animate('1s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }), 
          animate('1s ease-in-out',
            style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition(
      'Story => Music, Story => Tube, Story => Music, Story => Messenger, Story => Group,' +
      'Music => Tube, Music => MyProfile, Music => Messenger,' + 
      'Music => Group, Messenger => Tube, Tube => Group, Messenger => Group,' + 
      'Story => Discover, Music => Discover, Tube => Discover, Messenger => Discover, Group => Discover',
    [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%', height: '100%', overflow: 'hidden' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(100%)', width: '84.5%' }),
          animate('1s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }), 
          animate('1s ease-in-out',
            style({ transform: 'translateX(-100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('Tube => Music, Messenger => Music, Group => Music, Tube => Messenger, Group => Tube, Group => Messenger,' + 
    'Tube => Story, Messenger => Story, Music => Story, Group => Story, Discover => Story, Discover => Music,' +
    'Discover => Tube, Discover => Messenger, Discover => Group',
    [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%', height: '100%', overflow: 'hidden' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateX(-100%)', width: '84.5%' }),
          animate('1s ease-in-out',
            style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateX(0%)' }), 
          animate('1s ease-in-out',
            style({ transform: 'translateX(100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition('* => MyProfile, * => Profile, * => Page, * => MyPage',
    [
      query(':enter, :leave',
        style({ position: 'fixed', width: '100%', height: '100%', overflow: 'hidden' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateY(-100%)', width: '85%' }),
          animate('1s ease-in-out',
            style({ transform: 'translateY(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)' }), 
          animate('1s ease-in-out',
            style({ transform: 'translateY(100%)' }))
        ], { optional: true }),
      ])
    ]),
    transition(
      'MyProfile => Story, MyProfile => Music, MyProfile => Tube, MyProfile => Music, MyProfile => Messenger, MyProfile => Group,' + 
      'Profile => Story, Profile => Music, Profile => Tube, Profile => Music, Profile => Messenger, Profile => Group',
    [
      query(':enter, :leave',
        style({ position: 'fixed', overflow: 'hidden', width: '100%' }),
        { optional: true }),
      group([
        query(':enter', [
          style({ transform: 'translateY(100%)', width: '84.5%' }),
          animate('1s ease-in-out',
            style({ transform: 'translateY(0%)' }))
        ], { optional: true }),
        query(':leave', [
          style({ transform: 'translateY(0%)' }), 
          animate('1s ease-in-out',
            style({ transform: 'translateY(-100%)' }))
        ], { optional: true }),
      ])
    ]),
  ]),


]