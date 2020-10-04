import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadMessageComponent } from './thread-message.component';

describe('ThreadMessageComponent', () => {
  let component: ThreadMessageComponent;
  let fixture: ComponentFixture<ThreadMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreadMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreadMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
