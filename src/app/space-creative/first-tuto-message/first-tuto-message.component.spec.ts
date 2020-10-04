import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstTutoMessageComponent } from './first-tuto-message.component';

describe('FirstTutoMessageComponent', () => {
  let component: FirstTutoMessageComponent;
  let fixture: ComponentFixture<FirstTutoMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstTutoMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstTutoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
