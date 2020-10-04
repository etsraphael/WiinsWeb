import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMusicComponent } from './profile-music.component';

describe('ProfileMusicComponent', () => {
  let component: ProfileMusicComponent;
  let fixture: ComponentFixture<ProfileMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
