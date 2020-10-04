import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSaveComponent } from './music-save.component';

describe('MusicSaveComponent', () => {
  let component: MusicSaveComponent;
  let fixture: ComponentFixture<MusicSaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicSaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
