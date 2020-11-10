import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CryptoServiceService {

  constructor(private http: HttpClient) { }

  getCryptoAssetPrice(): Observable<AssetCryptoResponse> {
    return this.http.get<AssetCryptoResponse>(`https://data.messari.io/api/v1/assets?fields=id,slug,symbol,metrics/market_data/price_usd`);
  }

}

export interface AssetCryptoResponse {
  status: {
    elapsed: Number,
    timestamp: Date
  },
  data: DataCurrency[]
}

export interface DataCurrency {
  id: String,
  slug: String,
  symbol: String,
  metrics: {
    market_data: {
      price_usd: Number
    }
  }
}