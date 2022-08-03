import { Component, Input, OnInit } from '@angular/core';
import { CurrencyExchangeInputs, CurrencyExchangeResult } from 'src/app/interfaces/common';

@Component({
  selector: 'app-exchange-results',
  templateUrl: './exchange-results.component.html',
  styleUrls: ['./exchange-results.component.scss']
})
export class ExchangeResultsComponent implements OnInit {

  @Input() results: CurrencyExchangeResult | null = null;
  @Input() inputs: CurrencyExchangeInputs | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  abs = Math.abs;

  calculateDirectConversionDifference(): number {
    if (!this.results || !this.results.directConversionEstimate) {
      return 0;
    }
    return this.results.convertedAmount - this.results.directConversionEstimate;
  }

}
