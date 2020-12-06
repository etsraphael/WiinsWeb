import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileBodyComponent } from './my-profile-body.component';

describe('MyProfileBodyComponent', () => {
  let component: MyProfileBodyComponent;
  let fixture: ComponentFixture<MyProfileBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyProfileBodyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyProfileBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
