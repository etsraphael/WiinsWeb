import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
  useAnimation,
} from "@angular/animations";

export const SignAnimation = [
  trigger("routeAnimations", [
    transition("SignIn => OnBoarding, SignUp => OnBoarding", slideTo("left")),
    transition("OnBoarding => SignIn, OnBoarding => SignUp", slideTo("right")),
    transition("SignIn => Password-Setting", slideTo("right")),
    transition("Password-Setting => SignIn", slideTo("left")),
    transition("SignIn => SignUp", slideTo("left")),
    transition("OnBoarding => To-Discord", slideTo("right")),
    transition("To-Discord => OnBoarding", slideTo("left")),
    transition("OnBoarding => To-Stripe", slideTo("right")),
    transition("To-Stripe => OnBoarding", slideTo("left")),
  ])
];

function slideTo(direction: string) {
  const optional = { optional: true };
  return [
    query(
      ":enter, :leave",
      [
        style({
          position: "absolute",
          top: 0,
          [direction]: 0,
          width: "100%",
        }),
      ],
      optional
    ),
    query(":enter", [style({ [direction]: "-200%" })]),
    group([
      query(
        ":leave",
        [animate("800ms ease", style({ [direction]: "200%", opacity: 0 }))],
        optional
      ),
      query(":enter", [animate("800ms ease", style({ [direction]: "0%" }))]),
    ]),
    query(":leave", animateChild()),
    query(":enter", animateChild()),
  ];
}
