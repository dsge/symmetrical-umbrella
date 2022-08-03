import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CurrencyExchangeInputs } from 'src/app/interfaces/common';

@Component({
  selector: 'app-exchange-form',
  templateUrl: './exchange-form.component.html',
  styleUrls: ['./exchange-form.component.scss']
})
export class ExchangeFormComponent implements OnInit, OnChanges {

  @Input() disabled = false;
  @Output() onFormSubmit: EventEmitter<CurrencyExchangeInputs> = new EventEmitter();

  form = new FormGroup({
    currencyFrom: new FormControl('', [Validators.required]),
    currencyTo: new FormControl('', [Validators.required]),
    currencyAmount: new FormControl('', [Validators.required]),
  });

  constructor() { }

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
