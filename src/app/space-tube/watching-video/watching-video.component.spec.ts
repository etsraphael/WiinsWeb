import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchingVideoComponent } from './watching-video.component';

describe('WatchingVideoComponent', () => {
  let component: WatchingVideoComponent;
  let fixture: ComponentFixture<WatchingVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WatchingVideoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchingVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
