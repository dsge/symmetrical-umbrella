import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeResultsComponent } from './exchange-results.component';

describe('ExchangeResultsComponent', () => {
  let component: ExchangeResultsComponent;
  let fixture: ComponentFixture<ExchangeResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeResultsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
