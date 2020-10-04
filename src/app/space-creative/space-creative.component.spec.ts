import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceCreativeComponent } from './space-creative.component';

describe('SpaceCreativeComponent', () => {
  let component: SpaceCreativeComponent;
  let fixture: ComponentFixture<SpaceCreativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceCreativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceCreativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
