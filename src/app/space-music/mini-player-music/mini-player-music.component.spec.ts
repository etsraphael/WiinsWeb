import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniPlayerMusicComponent } from './mini-player-music.component';

describe('MiniPlayerMusicComponent', () => {
  let component: MiniPlayerMusicComponent;
  let fixture: ComponentFixture<MiniPlayerMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniPlayerMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniPlayerMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
