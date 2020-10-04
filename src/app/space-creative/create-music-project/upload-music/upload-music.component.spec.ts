import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadMusicComponent } from './upload-music.component';

describe('UploadMusicComponent', () => {
  let component: UploadMusicComponent;
  let fixture: ComponentFixture<UploadMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
