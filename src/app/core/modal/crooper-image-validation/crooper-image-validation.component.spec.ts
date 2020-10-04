import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrooperImageValidationComponent } from './crooper-image-validation.component';

describe('CrooperImageValidationComponent', () => {
  let component: CrooperImageValidationComponent;
  let fixture: ComponentFixture<CrooperImageValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrooperImageValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrooperImageValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
