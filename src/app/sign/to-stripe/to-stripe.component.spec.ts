import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToStripeComponent } from './to-stripe.component';

describe('ToStripeComponent', () => {
  let component: ToStripeComponent;
  let fixture: ComponentFixture<ToStripeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToStripeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
