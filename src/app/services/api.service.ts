import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyExchangeResult } from '../interfaces/common'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected http: HttpClient) { }

  public exchangeCurrency(currencyFrom: string, currencyTo: string, currencyAmount: number) {
    return this.http.get<CurrencyExchangeResult>('http://localhost:3000?' +
      'from=' + currencyFrom +
      '&to=' + currencyTo +
      '&amount=' + currencyAmount
    );
  }
}
