import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPlaylistMusicComponent } from './list-playlist-music.component';

describe('ListPlaylistMusicComponent', () => {
  let component: ListPlaylistMusicComponent;
  let fixture: ComponentFixture<ListPlaylistMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPlaylistMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPlaylistMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
