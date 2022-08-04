import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeHistoryComponent } from './exchange-history.component';

describe('ExchangeHistoryComponent', () => {
  let component: ExchangeHistoryComponent;
  let fixture: ComponentFixture<ExchangeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExchangeHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExchangeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
