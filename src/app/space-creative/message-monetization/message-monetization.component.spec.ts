import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMonetizationComponent } from './message-monetization.component';

describe('MessageMonetizationComponent', () => {
  let component: MessageMonetizationComponent;
  let fixture: ComponentFixture<MessageMonetizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageMonetizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageMonetizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
