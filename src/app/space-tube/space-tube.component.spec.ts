import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceTubeComponent } from './space-tube.component';

describe('SpaceTubeComponent', () => {
  let component: SpaceTubeComponent;
  let fixture: ComponentFixture<SpaceTubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceTubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceTubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
