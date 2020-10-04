import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStoryComponent } from './group-story.component';

describe('GroupStoryComponent', () => {
  let component: GroupStoryComponent;
  let fixture: ComponentFixture<GroupStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
