import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceGroupComponent } from './space-group.component';

describe('SpaceGroupComponent', () => {
  let component: SpaceGroupComponent;
  let fixture: ComponentFixture<SpaceGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
