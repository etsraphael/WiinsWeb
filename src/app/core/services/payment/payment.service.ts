import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'
import { Observable } from 'rxjs';
import { CardPayment } from '../../models/payment/cardPayment.model';
import { BalanceAccount } from '../../models/crypto/balanceAccount.model';
import { TransfertRequest } from '../../models/payment/TransfertRequest.model';

@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  // default
  baseUrl = environment.baseUrl
  coinBaseUrl = environment.coinBaseUrl

  constructor(private http: HttpClient) { }

  getCardPayment(payload: CardPayment): Observable<CoinBaseResponse> {
    const headers = new HttpHeaders({ 'X-CC-Api-Key': '9f771241-61a6-46b7-ab8f-aaafba4cf28b', 'X-CC-Version': '2018-03-22' })
    const options = { headers: headers }
    return this.http.post<CoinBaseResponse>(`${this.coinBaseUrl}/charges`, payload, options);
  }

  getAccountBalance(): Observable<AccountBalanceResponse> {
    return this.http.get<AccountBalanceResponse>(`${this.baseUrl}/payment/getMyLedger`)
  }

  getTransfertRequest(): Observable<TransfertRequestSingle> {
    return this.http.get<TransfertRequestSingle>(`${this.baseUrl}/payment/getTransfertRequestByUser`)
  }

}

export interface TransfertRequestSingle {
  status: number
  result: TransfertRequest[]
}

export interface CoinBaseResponse {
  data: {
    hosted_url: string,
    code: string
  }
}

export interface AccountBalanceResponse {
  status: number
  result: BalanceAccount
}
