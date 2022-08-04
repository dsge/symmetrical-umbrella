import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrencyExchangeInputs, CurrencyExchangeResult } from '../interfaces/common'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(protected http: HttpClient) { }

  public exchangeCurrency(values: CurrencyExchangeInputs) {
    return this.http.get<CurrencyExchangeResult>(location.protocol + '//' + location.hostname + ':3000?' +
      'from=' + values.currencyFrom +
      '&to=' + values.currencyTo +
      '&amount=' + values.currencyAmount
    );
  }
}
