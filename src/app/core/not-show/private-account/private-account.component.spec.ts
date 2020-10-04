import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateAccountComponent } from './private-account.component';

describe('PrivateAccountComponent', () => {
  let component: PrivateAccountComponent;
  let fixture: ComponentFixture<PrivateAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
