import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTubeComponent } from './profile-tube.component';

describe('ProfileTubeComponent', () => {
  let component: ProfileTubeComponent;
  let fixture: ComponentFixture<ProfileTubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
