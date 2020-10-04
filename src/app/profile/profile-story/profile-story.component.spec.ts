import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileStoryComponent } from './profile-story.component';

describe('ProfileStoryComponent', () => {
  let component: ProfileStoryComponent;
  let fixture: ComponentFixture<ProfileStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
