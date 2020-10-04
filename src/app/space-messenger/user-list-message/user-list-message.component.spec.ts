import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListMessageComponent } from './user-list-message.component';

describe('UserListMessageComponent', () => {
  let component: UserListMessageComponent;
  let fixture: ComponentFixture<UserListMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
