import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceDiscoverComponent } from './space-discover.component';

describe('SpaceDiscoverComponent', () => {
  let component: SpaceDiscoverComponent;
  let fixture: ComponentFixture<SpaceDiscoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceDiscoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
