import { Component, OnInit } from "@angular/core";
import { SignAnimation } from "src/assets/route-animation/sign-animation";

@Component({
  selector: "app-to-stripe",
  templateUrl: "./to-stripe.component.html",
  styleUrls: ["./to-stripe.component.scss"],
  animations: [SignAnimation],
})
export class ToStripeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
