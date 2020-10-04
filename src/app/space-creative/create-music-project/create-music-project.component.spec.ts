import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMusicProjectComponent } from './create-music-project.component';

describe('CreateMusicProjectComponent', () => {
  let component: CreateMusicProjectComponent;
  let fixture: ComponentFixture<CreateMusicProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMusicProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMusicProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
