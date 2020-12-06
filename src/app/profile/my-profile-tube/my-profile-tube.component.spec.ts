import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileTubeComponent } from './my-profile-tube.component';

describe('MyProfileTubeComponent', () => {
  let component: MyProfileTubeComponent;
  let fixture: ComponentFixture<MyProfileTubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileTubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileTubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
