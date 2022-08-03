import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CurrencyExchangeInputs } from 'src/app/interfaces/common';
import { CurrencyService } from 'src/app/services/currency.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss']
})
export class ExchangeFormComponent implements OnInit, OnChanges {

  @Input() disabled = false;
  @Output() onFormSubmit: EventEmitter<CurrencyExchangeInputs> = new EventEmitter();

  protected currencyFromStorageKey = "currencyFrom";
  protected currencyToStorageKey = "currencyTo";

  public currencies$: Observable<{[key: string]: string;}>;
  public defaultLocalCurrency$: Observable<string|null>;

  form = new FormGroup({
    currencyFrom: new FormControl('', [Validators.required]),
    currencyTo: new FormControl('', [Validators.required]),
    currencyAmount: new FormControl('', [Validators.required]),
  });

  constructor(protected currencyService: CurrencyService, protected storageService: StorageService) {

    this.currencies$ = currencyService.currencies$.pipe();
    this.defaultLocalCurrency$ = currencyService.localCurrencyEstimation$.pipe();

    this.loadInitialFormValues();

    this.form.valueChanges.subscribe({
      next: (values) => {
        this.storageService.set(this.currencyFromStorageKey, values.currencyFrom);
        this.storageService.set(this.currencyToStorageKey, values.currencyTo);
      }
    })
  }

  /**
   * If we have something stored in the storageService, then we will use that as defaults.
   * If not, then we will guess based on defaultLocalCurrency$
   */
  protected loadInitialFormValues():void {

    const currencyFrom = this.storageService.get(this.currencyFromStorageKey);
    const currencyTo = this.storageService.get(this.currencyToStorageKey);

    if (!currencyFrom) {
      const sub = this.defaultLocalCurrency$.subscribe({
        next: (value) => {
          if (value) {
            this.form.patchValue({currencyFrom: value});
          }
        }
      })
    } else {
      this.form.patchValue({currencyFrom: currencyFrom});
    }
    if (currencyTo) {
      this.form.patchValue({currencyTo: currencyTo});
    }
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['disabled']) {
      if (changes['disabled'].currentValue) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  onSubmit(): void {
    const formValues = this.form.value;

    this.onFormSubmit.emit({
      currencyFrom: formValues.currencyFrom || '',
      currencyTo: formValues.currencyTo || '',
      currencyAmount: Number(formValues.currencyAmount)
    });
  }

}
