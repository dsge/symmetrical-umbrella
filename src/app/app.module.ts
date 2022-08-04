import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ExchangeFormComponent } from './components/exchange-form/exchange-form.component';
import { ExchangeResultsComponent } from './components/exchange-results/exchange-results.component';
import { CurrencyRecommendationsComponent } from './components/currency-recommendations/currency-recommendations.component';

@NgModule({
  declarations: [
    AppComponent,
    ExchangeFormComponent,
    ExchangeResultsComponent,
    CurrencyRecommendationsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
