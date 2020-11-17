import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationStepsComponent } from './certification-steps.component';

describe('CertificationStepsComponent', () => {
  let component: CertificationStepsComponent;
  let fixture: ComponentFixture<CertificationStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificationStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
