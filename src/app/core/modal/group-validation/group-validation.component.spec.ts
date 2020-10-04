import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupValidationComponent } from './group-validation.component';

describe('GroupValidationComponent', () => {
  let component: GroupValidationComponent;
  let fixture: ComponentFixture<GroupValidationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupValidationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
