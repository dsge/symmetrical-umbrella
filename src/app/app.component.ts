import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { CurrencyExchangeInputs, CurrencyExchangeResult } from './interfaces/common'

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

  loading = false;

  constructor(protected api: ApiService) {

  }

  ngOnInit(): void {
  }

  onSubmit($event: CurrencyExchangeInputs): void {
    this.loading = true;
    this.results = null;
    this.lastInputs = null;

    const sub = this.api.exchangeCurrency($event).subscribe({
      next: (value) => {
        this.results = value;
        this.lastInputs = $event;
        sub.unsubscribe();
        this.loading = false;
      },
      error: (err) => {
        sub.unsubscribe();
        this.loading = false;
      }
    })
  }
}
