import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTubeComponent } from './home-tube.component';

describe('HomeTubeComponent', () => {
  let component: HomeTubeComponent;
  let fixture: ComponentFixture<HomeTubeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTubeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
