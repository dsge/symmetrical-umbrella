import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CurrencyExchangeRecommendation } from 'src/app/interfaces/common';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-currency-recommendations',
  templateUrl: './currency-recommendations.component.html',
  styleUrls: ['./currency-recommendations.component.scss']
})
export class CurrencyRecommendationsComponent implements OnInit {

  @Output() onSelectRecommendation: EventEmitter<CurrencyExchangeRecommendation> = new EventEmitter();

  currencyRecommendations$ = new BehaviorSubject<Array<CurrencyExchangeRecommendation>>([
    {from: 'EUR', to: 'HUF'},
    {from: 'HUF', to: 'EUR'},
    {from: 'USD', to: 'HUF'},
    {from: 'HUF', to: 'USD'},
  ]);

  constructor(protected currencyService: CurrencyService) {

  }

  ngOnInit(): void {
  }

  selectRecommendation(item: CurrencyExchangeRecommendation) {
    this.onSelectRecommendation.emit(item);
  }

}
