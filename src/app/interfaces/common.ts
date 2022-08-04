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

export interface CurrencyExchangeRecommendation {
  from: string,
  to: string,
  amount?: number,
}

export interface ExchangeHistoryItem {
  inputs: CurrencyExchangeInputs,
  results: CurrencyExchangeResult,
}
