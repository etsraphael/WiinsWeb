import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaceMessengerComponent } from './space-messenger.component';

describe('SpaceMessengerComponent', () => {
  let component: SpaceMessengerComponent;
  let fixture: ComponentFixture<SpaceMessengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpaceMessengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
