import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CurrencyExchangeRecommendation, ExchangeHistoryItem } from 'src/app/interfaces/common';

@Component({
  selector: 'app-exchange-history',
  templateUrl: './exchange-history.component.html',
  styleUrls: ['./exchange-history.component.scss']
})
export class ExchangeHistoryComponent implements OnInit, OnDestroy {

  @Input('exchangeHistory') exchangeHistory$: Observable<Array<ExchangeHistoryItem>> | undefined;
  @Output() onExchangeAgain: EventEmitter<CurrencyExchangeRecommendation> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onExchangeAgainPressed($event: ExchangeHistoryItem) {
    this.onExchangeAgain.emit({
      from: $event.inputs.currencyFrom,
      to: $event.inputs.currencyTo,
      amount: $event.inputs.currencyAmount
    });
  }

  ngOnDestroy(): void {
  }

}
