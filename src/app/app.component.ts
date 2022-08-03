import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './services/api.service';
import { CurrencyExchangeResult } from './interfaces/common'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  form = new FormGroup({
      currencyFrom: new FormControl('', [Validators.required]),
      currencyTo: new FormControl('', [Validators.required]),
      currencyAmount: new FormControl('', [Validators.required]),
  });

  results: CurrencyExchangeResult | null = null;

  constructor(protected api: ApiService) {

  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.form.disable();
    this.results = null;

    const formValues = this.form.value;

    const sub = this.api.exchangeCurrency(formValues.currencyFrom || '', formValues.currencyTo || '', Number(formValues.currencyAmount)).subscribe({
      next: (value) => {
        this.results = value;
        sub.unsubscribe();
        this.form.enable();
      },
      error: (err) => {
        sub.unsubscribe();
        this.form.enable();
      }
    })
  }
}
