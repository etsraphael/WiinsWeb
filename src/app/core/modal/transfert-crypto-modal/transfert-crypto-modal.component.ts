import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TransfertAccount } from 'src/app/home-setting/ledger/ledger.component';

@Component({
  selector: 'app-transfert-crypto-modal',
  templateUrl: './transfert-crypto-modal.component.html',
  styleUrls: ['./transfert-crypto-modal.component.scss']
})

export class TransfertCryptoModalComponent implements OnInit {

  // form
  addressToSend: string
  currentPage: number = 0
  amountCryptoChoosed: number = 0
  placeHolderAdress: string
  currencyChoosed: string
  password: string

  // verification
  amountLimit = 0

  constructor(
    public dialogRef: MatDialogRef<TransfertCryptoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { transfertAccount: TransfertAccount }
  ) { }

  ngOnInit() {

    switch (this.data.transfertAccount.currency) {
      case 'btc':
        this.placeHolderAdress = 'Address bitcoin'
        this.currencyChoosed = 'BTC'
        break;
      case 'eth':
        this.placeHolderAdress = 'Address ethereum'
        this.currencyChoosed = 'ETH'
        break;
      case 'bch':
        this.placeHolderAdress = 'Address bitcoin cash'
        this.currencyChoosed = 'BCH'
        break;
      case 'ltc':
        this.placeHolderAdress = 'Address litecoin'
        this.currencyChoosed = 'LTC'
        break;
    }
  }

  nextPage(page: number) {
    switch (page) {
      case 1:
        this.currentPage++
        break;

      case 2:
        this.currentPage++
        break;
      // close the modal
      case 3:
        this.dialogRef.close()
        setTimeout(() => location.reload(), 1000);
        break;
      default: return null
    }
  }

  previousPage() {
    --this.currentPage
  }

  updateAmount(): void {
    this.amountLimit =
      this.data.transfertAccount.balanceAccount
      - 1.03*this.amountCryptoChoosed
  }

  getAmountInUsd(): string {
    return (((this.amountCryptoChoosed * 1.03)) * this.data.transfertAccount.marketPriceUsd).toFixed(2)
  }

  getTotalInCrypto(): string {
    return (this.amountCryptoChoosed * 0.03 + this.amountCryptoChoosed).toFixed(6)
  }

  setMaxAccount() {
    this.amountCryptoChoosed = this.data.transfertAccount.balanceAccount - (this.data.transfertAccount.balanceAccount * 0.03)
    this.amountCryptoChoosed = Number(this.amountCryptoChoosed.toFixed(6))
  }

  getNumberFees(): string {
    return (0.03*this.amountCryptoChoosed).toFixed(6)
  }

}