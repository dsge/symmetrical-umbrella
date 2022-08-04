import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from './services/api.service';
import { CurrencyExchangeInputs, CurrencyExchangeRecommendation, CurrencyExchangeResult, ExchangeHistoryItem } from './interfaces/common'
import { BehaviorSubject, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  /**
   * The results of the last successful currency exchange
   */
  results: CurrencyExchangeResult | null = null;
  /**
   * The inputs of the last currency exchange
   */
  lastInputs: CurrencyExchangeInputs | null = null;
  /**
   * Emits when the user clicks on a currency exchange recommendation on the UI
   */
  recommendationSelection$ = new Subject<CurrencyExchangeRecommendation>();
  /**
   * Previous successful exchanges
   */
  exchangeHistory$ = new BehaviorSubject<Array<ExchangeHistoryItem>>([])
  protected exchangeHistoryStorageKey = 'history';

  loading = false;
  @ViewChild('content') errorModalContents: any;

  constructor(protected api: ApiService, protected modalService: NgbModal, protected storage: StorageService) {
    this.exchangeHistory$.next(this.loadExchangeHistory())
  }

  ngOnInit(): void {
  }

  protected loadExchangeHistory(): Array<ExchangeHistoryItem> {
    const history = this.storage.get(this.exchangeHistoryStorageKey);
    if (history) {
      return history;
    }
    return [];
  }

  onSelectRecommendation($event: CurrencyExchangeRecommendation) {
    this.recommendationSelection$.next($event);
  }

  onExchangeAgain($event: CurrencyExchangeRecommendation) {
    this.recommendationSelection$.next($event);

    this.onSubmit({
      currencyAmount: Number($event.amount),
      currencyFrom: $event.from,
      currencyTo: $event.to,
    });
  }

  onSubmit($event: CurrencyExchangeInputs): void {
    this.loading = true;
    this.results = null;
    this.lastInputs = null;

    const sub = this.api.exchangeCurrency($event).subscribe({
      next: (value) => {
        this.results = value;
        this.lastInputs = $event;

        const history = this.exchangeHistory$.value;
        history.push({
          inputs: $event,
          results: value
        })
        if (history.length > 5) {
          history.shift();
        }
        this.exchangeHistory$.next(history);
        this.storage.set(this.exchangeHistoryStorageKey, history);

        sub.unsubscribe();
        this.loading = false;
      },
      error: (err) => {
        sub.unsubscribe();
        this.loading = false;
        this.modalService.open(this.errorModalContents);
      }
    })
  }
}
