import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoprofileComponent } from './noprofile.component';

describe('NoprofileComponent', () => {
  let component: NoprofileComponent;
  let fixture: ComponentFixture<NoprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
