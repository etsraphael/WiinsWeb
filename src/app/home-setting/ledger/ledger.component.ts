import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { UserModel } from 'src/app/core/models/baseUser/user.model';
import { CardPayment } from 'src/app/core/models/payment/cardPayment.model';
import { CoinBaseResponse, PaymentService } from 'src/app/core/services/payment/payment.service';
import { TranslationService } from 'src/app/core/services/translation/translation.service';
import { MyUserStoreSelectors, RootStoreState } from 'src/app/root-store';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})

export class LedgerComponent implements OnInit {

  // visual
  chargedBtnCliked = false
  showMessagePayment = false

  // info
  price: string

  // payment
  paymentSub: Subscription

  // my user
  user$: Observable<UserModel>
  currencyArray = [
    { currency: 'Bitcoin (BTC)', amount: 150 },
    { currency: 'Ethereum (ETH)', amount: 110 },
    { currency: 'Bitcoin Cash (BCH)', amount: 50 }
  ]

  constructor(
    private translate: TranslateService,
    private _snackBar: MatSnackBar,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private store$: Store<RootStoreState.State>,
    private translationService: TranslationService
  ) { }


  ngOnInit(): void {

    // to select my user
    this.user$ = this.store$.pipe(
      select(MyUserStoreSelectors.select),
      skipWhile(val => val == null),
      filter(val => !!val)
    )

  }

  showChargeInput(): void {
    this.chargedBtnCliked = true
  }

  generatePayment(): void | MatSnackBarRef<SimpleSnackBar> {

    // check a valid price 
    if (!this.price) {
      return this._snackBar.open(
        this.translate.instant('ERROR-MESSAGE.els-ar-missing'),
        this.translate.instant('CORE.close'),
        { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
      )
    }

    // create the card
    const cardPayment = new CardPayment(
      'title',
      this.translate.instant('WARNING.BC-make-sure-you-have-the-correct-address'),
      'fixed_price',
      { amount: this.price, currency: 'USD' },
      {
        userID: this.activatedRoute.parent.snapshot.data['loadedUser']._id,
        price: Number(this.price)
      }
    )

    // send the request to coinbase commerce
    this.paymentSub = this.paymentService.getCardPayment(cardPayment).subscribe(
      (action: CoinBaseResponse) => {
        // redirection
        window.open(action.data.hosted_url, '_blank')
        this.chargedBtnCliked = false
        this.showMessagePayment = true
      },
      () => {
        // error message
        this._snackBar.open(
          this.translate.instant('ERROR-MESSAGE.A-err-has-occurred'),
          this.translate.instant('CORE.close'),
          { horizontalPosition: 'center', verticalPosition: 'bottom', duration: 5000 }
        )
      }
    )


  }

  getTotalAccount(): string{
    return this.currencyArray.map(x => x.amount).reduce((a, b) => a + b, 0) + ' $USD'
  }


}
