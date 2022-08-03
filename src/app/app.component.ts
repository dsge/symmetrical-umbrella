import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  results: {
    convertedAmount:number,
    directConversionEstimate: number|null,
    wasConvertedThroughEur:boolean
  } | null = null;

  constructor(protected http: HttpClient) {

  }

  ngOnInit(): void {
  }

  private submitHttpCall() {
    return this.http.get<any>('http://localhost:3000?' +
      'from=' + this.form.value.currencyFrom +
      '&to=' + this.form.value.currencyTo +
      '&amount=' + this.form.value.currencyAmount
    );
  }

  onSubmit(): void {
    this.form.disable();
    this.results = null;

    const sub = this.submitHttpCall().subscribe({
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
