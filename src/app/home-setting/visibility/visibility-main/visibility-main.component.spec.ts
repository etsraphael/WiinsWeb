import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityMainComponent } from './visibility-main.component';

describe('VisibilityMainComponent', () => {
  let component: VisibilityMainComponent;
  let fixture: ComponentFixture<VisibilityMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisibilityMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
