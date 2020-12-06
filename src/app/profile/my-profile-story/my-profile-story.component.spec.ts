import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileStoryComponent } from './my-profile-story.component';

describe('MyProfileStoryComponent', () => {
  let component: MyProfileStoryComponent;
  let fixture: ComponentFixture<MyProfileStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
