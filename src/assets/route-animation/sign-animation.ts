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
import { jello, lightSpeedIn } from "ngx-animate";

export const SignAnimation = [
  trigger("routeAnimations", [
    transition("SignIn => OnBoarding, SignUp => OnBoarding", slideTo("left")),
    transition("OnBoarding => SignIn, OnBoarding => SignUp", slideTo("right")),
  ]),
  trigger("stateLogin", [
    transition(
      "default => error",
      useAnimation(jello, { params: { timing: 1.2 } })
    ),
  ]),
  trigger("donation", [
    transition(
      "* => true",
      useAnimation(lightSpeedIn, { params: { timing: 0.5 } })
    ),
  ]),
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
    query(":enter", [style({ [direction]: "-100%" })]),
    group([
      query(
        ":leave",
        [animate("600ms ease", style({ [direction]: "200%", opacity: 0 }))],
        optional
      ),
      query(":enter", [animate("600ms ease", style({ [direction]: "0%" }))]),
    ]),
    query(":leave", animateChild()),
    query(":enter", animateChild()),
  ];
}
