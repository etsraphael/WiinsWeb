import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnbordingComponent } from './onbording.component';

describe('OnbordingComponent', () => {
  let component: OnbordingComponent;
  let fixture: ComponentFixture<OnbordingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnbordingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OnbordingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
