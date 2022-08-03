import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable, of } from 'rxjs';
import { countries } from '../models/countries';
import { currencies } from '../models/currencies';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  public currencies$ = new BehaviorSubject(currencies);
  public localCurrencyEstimation$: Observable<string|null>;

  constructor() {
    this.localCurrencyEstimation$ = of(countries).pipe(map(this.calculateLocalCurrencyEstimation));
  }

  protected calculateLocalCurrencyEstimation(countries: Array<{countryCode:string, currencyCode:string}>) {
    let countryCode = '';
    try {
      /**
       * Try to guess the user's local country code based on their browser's local language setting.
       */
      countryCode = Intl.DateTimeFormat().resolvedOptions().locale.split('-')[1];
    } catch (e) {
      return null;
    }
    /**
     * Filter down our country code list to only the ones matching the countrycode that we are guessing
     */
    const matches = countries.filter((country) => {
      if (country && country.countryCode && country.countryCode == countryCode) {
        return true;
      } else {
        return false;
      }
    })
    /**
     * Use the first match if we have a match to guess the default currencyCode
     */
    if (matches[0]) {
      return matches[0].currencyCode;
    } else {
      return null;
    }
  }

}
