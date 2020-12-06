import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileMusicComponent } from './my-profile-music.component';

describe('MyProfileMusicComponent', () => {
  let component: MyProfileMusicComponent;
  let fixture: ComponentFixture<MyProfileMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyProfileMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
