import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceStoryComponent } from './space-story.component';

describe('SpaceStoryComponent', () => {
  let component: SpaceStoryComponent;
  let fixture: ComponentFixture<SpaceStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
