import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { filter, skipWhile, take } from 'rxjs/operators';
import { UserModel } from 'src/app/core/models/baseUser/user.model';
import { CardPayment } from 'src/app/core/models/payment/cardPayment.model';
import { AssetCryptoResponse, CryptoServiceService, DataCurrency } from 'src/app/core/services/crypto/crypto-service.service';
import { CoinBaseResponse, PaymentService } from 'src/app/core/services/payment/payment.service';
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
  currencyArray = []
  totalBalance = 0

  constructor(
    private translate: TranslateService,
    private _snackBar: MatSnackBar,
    private paymentService: PaymentService,
    private activatedRoute: ActivatedRoute,
    private store$: Store<RootStoreState.State>,
    private cryptoServiceService: CryptoServiceService
  ) { }


  ngOnInit(): void {

    // to select my user
    this.user$ = this.store$.pipe(
      select(MyUserStoreSelectors.select),
      skipWhile(val => val == null),
      filter(val => !!val)
    )

    // get the crypto assets in real time
    this.cryptoServiceService.getCryptoAssetPrice().pipe(take(1)).subscribe((response: AssetCryptoResponse) => {

      this.paymentService.getAccountBalance().pipe(take(1)).subscribe(console.log)

      this.currencyArray = [
        { code: 'BTC', currency: 'Bitcoin (BTC)', amount: 0.004 },
        { code: 'ETH', currency: 'Ethereum (ETH)', amount: 2.1 },
        { code: 'BCH', currency: 'Bitcoin Cash (BCH)', amount: 0.0145 },
        { code: 'LTC', currency: 'Litecoin (LTC)', amount: 1.3 }
      ]

      for(let item of this.currencyArray){
        item.price_usd = 
        (Number(response.data.filter(obj => obj.symbol == item.code).map(x => x.metrics.market_data.price_usd))
        * item.amount).toFixed(2)
        this.totalBalance += Number(item.price_usd)
      }

    })

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



}
