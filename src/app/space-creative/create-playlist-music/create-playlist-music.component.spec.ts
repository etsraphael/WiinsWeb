import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlaylistMusicComponent } from './create-playlist-music.component';

describe('CreatePlaylistMusicComponent', () => {
  let component: CreatePlaylistMusicComponent;
  let fixture: ComponentFixture<CreatePlaylistMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlaylistMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlaylistMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
