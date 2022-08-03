export interface CurrencyExchangeResult {
  convertedAmount:number,
  directConversionEstimate: number|null,
  wasConvertedThroughEur:boolean
}

export interface CurrencyExchangeInputs {
  currencyFrom: string;
  currencyTo: string;
  currencyAmount: number;
}
