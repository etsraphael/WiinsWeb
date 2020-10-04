import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceMusicComponent } from './space-music.component';

describe('SpaceMusicComponent', () => {
  let component: SpaceMusicComponent;
  let fixture: ComponentFixture<SpaceMusicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceMusicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceMusicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
