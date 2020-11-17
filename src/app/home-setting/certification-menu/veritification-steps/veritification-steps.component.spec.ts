import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeritificationStepsComponent } from './veritification-steps.component';

describe('VeritificationStepsComponent', () => {
  let component: VeritificationStepsComponent;
  let fixture: ComponentFixture<VeritificationStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeritificationStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeritificationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
