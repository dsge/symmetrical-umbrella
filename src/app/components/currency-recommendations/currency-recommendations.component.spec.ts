import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyRecommendationsComponent } from './currency-recommendations.component';

describe('CurrencyRecommendationsComponent', () => {
  let component: CurrencyRecommendationsComponent;
  let fixture: ComponentFixture<CurrencyRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyRecommendationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
