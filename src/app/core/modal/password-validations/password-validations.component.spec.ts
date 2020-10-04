import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordValidationsComponent } from './password-validations.component';

describe('PasswordValidationsComponent', () => {
  let component: PasswordValidationsComponent;
  let fixture: ComponentFixture<PasswordValidationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordValidationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordValidationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
